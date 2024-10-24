import apiClient from ".";

export {
    createOrder,
    paymentHandler
}


const createOrder = async (totalCartAmount : number) => {
    try {
      const response = await apiClient.post('/order/create-order', {
        amount: totalCartAmount,
        currency: 'INR'
      });
      if(!response.data.data.orderId){
        alert("Error Happened")
      }
      return response.data.data.orderId;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

const paymentHandler =  async({paymentResponse, totalCartAmount} : any) =>  {
  try {
    const response = await apiClient.post('/order/verify-payment', {
      amount : totalCartAmount,
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,
    })
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
  }
}