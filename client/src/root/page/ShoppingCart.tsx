import  { useState } from "react";
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
import apiClient from "../../services/index.ts";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ShoppingCart = () => {
  const [products] = useState([
    {
        images : [
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp02-960521.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-925121.jpg",
        "https://cdn-media.powerlook.in/catalog/product/1/-/1-dp-921921.jpg"
        ],
        _id : "12345678",
        title : "Light blue cargo",
        price : "2000",
        discountedPrice : "1700"
    },
    {
        images : [
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp02-960521.jpg",
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-925121.jpg",
        "https://cdn-media.powerlook.in/catalog/product/1/-/1-dp-921921.jpg"
        ],
        _id : "12345678",
        title : "Light blue cargo",
        price : "2000",
        discountedPrice : "1700"
    },
  ])
  const [quantity, setQuantity] = useState<number>(1);
  const handleIncrement = () => {
    setQuantity((prev) => prev+1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev-1);
    }
  };
  const createOrder = async () => {
    try {
      const response = await apiClient.post('/order/create-order', {
        amount: 1000, // Amount in INR (500 INR)
        currency: 'INR'
      });
      console.log("orderId",response.data.data.orderId);
      if(!response.data.data.orderId){
        alert("Error Happened")
      }
      return response.data.data.orderId;
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const handlePayment = async () => {
    const orderId  = await createOrder();
    if(!orderId) return
    console.log(orderId);
    console.log(orderId);
    console.log(orderId);
    
    const options = {
      key: 'rzp_test_oQMGR2Jlz0WV73', // Your Razorpay Key ID
      amount: 100000, // Amount in paise (e.g., 50000 paise = 500 INR)
      currency: 'INR',
      name: 'Cara',
      description: 'Test Transaction dont worry just click it will not cut any money enter fake otp',
      order_id : orderId,
      // Order ID from the backend
      handler: function (response : any) {
        // Handle successful payment
        alert('Payment Successful');
        console.log("response");
        console.log(response);

        apiClient.post('/order/verify-payment', {
          amount : 100000,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }).then((res) => {
          console.log('Server response:', res.data);
          alert("Payment Verified Successfully");
          // Handle server response, like showing a thank you message
        }).catch((error) => {
          console.error('Error verifying payment:', error);
          // Handle errors, like showing an error message
        });
        console.log('Payment ID:', response.razorpay_payment_id);
        console.log('Order ID:', response.razorpay_order_id);
        console.log('Signature:', response.razorpay_signature);
        // Optionally send these details to your backend for verification
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
    <Navigation/>  
    <div className="p-5 sm:px-10 flex h-full flex-col sm:flex-row justify-between items-start">
      <div className="left sm:p-10 w-full sm:w-[70%]">
        <div className="flex justify-between items-center sm:mb-0 mb-5">
          <h1 className="font-semibold text-base sm:text-xl">Shopping cart</h1>
          <h1 className="text-base sm:text-lg">Total: ₹1299.00</h1>
        </div>
        {
          products.map((product,index) => (
            <div key={index} className="w-full flex justify-start items-start sm:items-center h-auto sm:h-40 p-1 border rounded-sm my-3">
            <img
              className="h-full w-[20%] border rounded-sm object-cover"
              src={product.images[0]}
              alt=""
            />
            <div className="h-full w-[80%] sm:p-2">
              <div className="upper w-full flex p-1 sm:p-3 justify-between items-start flex-col sm:flex-row h-[80%]">
                <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
                  <h2 className="text-sm">{product.title}</h2>
                  <h3 className="text-sm">
                    Color{" "}
                    <div
                      style={{ backgroundColor: "black" }}
                      className="inline-block border rounded-sm h-3 w-3 mx-1 mt-[4px]"
                    ></div>{" "}
                    Size · small · SKU 04-955630-small
                  </h3>
                  <div className="flex justify-start gap-1 items-center w-full mt-2">
                    <p className="text-[15px] font-semibold">QTY</p>
                    <span
                      className="py-0 px-2 text-lg border mr-1 font-semibold cursor-pointer"
                      onClick={handleIncrement}
                    >
                      +
                    </span>
                    <span className="text-lg mr-1 font-semibold">{quantity}</span>
                    <span
                      className="py-0 px-2 text-lg border mr-2 font-semibold cursor-pointer"
                      onClick={handleDecrement}
                    >
                      -
                    </span>
                  </div>
                </div>
                <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-0 sm:flex-col sm:w-[20%]">
                  <h1 className="font-semibold text-sm sm:text-xl my-1 sm:my-0">
                    ₹{product.price}
                  </h1>
                  <h3 className="inline-block text-sm sm:text-md font-semibold text-green-600">
                    (27% off)
                  </h3>
                </div>
              </div>
              <div className="lower h-[20%] w-full">
                <div className="flex h-full w-full justify-start items-center p-1 sm:p-3 sm:py-4">
                  <div className="remove text-slate-400 text-sm pr-7 font-semibold cursor-pointer border-r-2">
                    REMOVE
                  </div>
                  <div className="move text-red-500 text-sm pl-7 font-semibold cursor-pointer">
                    MOVE TO WISHLIST
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        }
      
      </div>
      <div className="right sm:p-10 w-full h-auto sm:w-[30%] sm:border-l-2">
        <h1 className="my-5 text-base font-semibold sm:text-2xl">Price Details</h1>
        <div className="flex justify-between items-center py-0 sm:py-2 sm:text-base">
          <h2>Total MRP</h2>
          <h2>₹1299.00</h2>
        </div>
        <div className="flex justify-between items-center py-0 sm:py-2 text-base">
          <h2>Discount on MRP</h2>
          <h2>-₹355.00</h2>
        </div>
        <div className="flex justify-between items-center border-b-4 py-0 sm:py-2 pb-4 text-base">
          <h2>Delivery</h2>
          <h2 className="text-red-500">Free Delivery</h2>
        </div>
        <div className="flex justify-center items-center border-b-4 py-5 pb-4 text-base">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 text-2xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
            <path d="M3 9l4 0"></path>
          </svg>
          Free delivery order over ₹499
        </div>
        <div className="py-4 text-center px-6 border text-green-600 my-3 cursor-pointer rounded-md">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block text-2xl mr-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
            <path d="m15 9-6 6"></path>
            <path d="M9 9h.01"></path>
            <path d="M15 15h.01"></path>
          </svg>
          Apply coupon
        </div>
        <div className="flex w-full px-4 py-2 flex-row sm:flex-col justify-between items-center fixed left-0 bottom-0 sm:relative bg-white">
          <div className="total flex flex-col sm:flex-row w-1/2 sm:w-full sm:justify-between items-start sm:items-center">
            <h2 className="font-bold text-xs sm:text-xl text-left text-slate-500 sm:capitalize uppercase">
              Total amount
            </h2>
            <h2 className="font-bold text-left sm:text-xl text-2xl">₹944.00</h2>
          </div>
          <div onClick={handlePayment} className="btn px-3 py-4 w-1/2 sm:w-full text-center cursor-pointer bg-slate-700 text-white font-semibold my-3 rounded-lg">
            CHECKOUT
          </div>
        </div>
      </div>
    </div>
    <Footer/> 
    </>
  );
};

export default ShoppingCart;