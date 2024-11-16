import apiClient from ".";

export {
    createOrder,
    paymentHandler,
    getUserOrders,
    getSellerOrders,
    updateOrderStatus
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

const getUserOrders = async(pageParam : number) => {
    const response = await apiClient.get(`/order?pageParam=${pageParam}`);
    return response.data.data
}

const getSellerOrders = async(pageParam=0) => {
    const response = await apiClient.get(`/order/seller?pageParam=${pageParam}`);
    return response.data.data
}

const updateOrderStatus = async(data : any) => {
    const response = await apiClient.patch("/order/update",data);
    return response.data.data
}