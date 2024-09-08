import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: 'rzp_test_jeQcIiD4GA4Q7A', 
  key_secret: 'S1DoAM8WQa9v5WtXNp6EgUIY'
});

export const createOrder = async (req, res) => {
  const {totalAmount,products} = req.body
  console.log(req);
  try {
    const newOrder = Order.create({
      user : req.user._id,
      products,
      status : "processing"
    })
    const options = {
      amount: totalAmount || 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };

    const order = await instance.orders.create(options);
    newOrder.status = "success";
    await newOrder.save({validationBeforeSave : false})
    res.status(200).json({ orderId: order.id });
  } catch (error) {
    newOrder.status = "failed";
    await newOrder.save({validationBeforeSave : false})
    res.status(500).json({ error: 'Error creating order' });
  }
};

import crypto from 'crypto';
import ApiError from '../utils/ApiError';
import Order from '../model/Order.model';

export const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = 'S1DoAM8WQa9v5WtXNp6EgUIY'; // Your key secret

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (expectedSignature === razorpay_signature) {
    
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};
