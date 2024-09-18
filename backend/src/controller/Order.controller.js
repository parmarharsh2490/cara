import Razorpay from 'razorpay';
import crypto from 'crypto';
import { RAZORPAY_API_KEY_ID, RAZORPAY_KEY_SECRET } from '../constants.js';
import Order from '../model/Order.model.js';
const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY_ID, 
  key_secret: RAZORPAY_KEY_SECRET
});
console.log(RAZORPAY_API_KEY_ID);
console.log(RAZORPAY_KEY_SECRET);


export const createOrder = async (req, res) => {
  const {amount,products} = req.body
  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await instance.orders.create(options);
    console.log(order);

    // newOrder.status = "success";
    // await newOrder.save({validationBeforeSave : false})
    console.log("here successsfull",order.id);
    
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    // newOrder.status = "failed";
    // await newOrder.save({validationBeforeSave : false})
    res.status(500).json({ error: 'Error creating order' });
  }
};


export const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  console.log({ razorpay_order_id, razorpay_payment_id });
  
  const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    // Payment is verified
    // Update your order status, save payment details, etc.
    res.json({ status: 'success', message: 'Payment verified successfully' });
  } else {
    // Payment verification failed
    res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
  }
};
