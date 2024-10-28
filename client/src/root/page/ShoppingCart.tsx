import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
import { useGetUserCart, useRemoveFromCart, useUpdateQuantity } from "../../query/CartQueries.ts";
import { ICartItems } from "../../types/index.ts";
import { totalDiscount,countTotalCartAmount } from "../../utils/cartPriceHelper.ts";
import { useCreateOrder, usePaymentHandler } from "../../query/order.query.ts";
import { useToast } from "@/hooks/use-toast.ts";
import { useAddToWishlist } from "@/query/WishlistQueries.ts";
import ShoppingCartSkeleton from "@/utils/skeleton/ShoppingCartSkeleton.tsx";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const ShoppingCart = () => {
  const {toast} = useToast()
  const {data : products,isLoading,isFetched} = useGetUserCart()
  const {mutateAsync : updateQuantity} = useUpdateQuantity();
  const {mutateAsync : createOrder,isPending:isOrderCreating} = useCreateOrder()
  const {mutateAsync : paymentHandler,isSuccess:isPaymentSuccess} = usePaymentHandler();
  const {mutateAsync : removeProductFromCart} = useRemoveFromCart();
  const {mutateAsync : addToWishlist} = useAddToWishlist();
  const {totalCartAmount,totalCartDiscount,totalMrp} = countTotalCartAmount(products || [])
 
  const handlePayment = async () => {
    const orderId  = await createOrder(totalCartAmount);
    if(!orderId) return
    
    const options = {
      key: import.meta.env.RAZORPAY_API_KEY,
      amount: totalCartAmount,
      currency: 'INR',
      name: 'Cara',
      description: 'Test Transaction dont worry just click it will not cut any money enter fake otp',
      order_id : orderId,
      handler: async(response: any) => {
        try {
          await paymentHandler({paymentResponse : response, totalCartAmount}),
          toast({
            title : "Success",
            description : "Successfully Placed Order",
            variant : "OrderStatusChange"
          })
        } catch (error) {
          toast({
            title : "Fail",
            description : "Failed to  Placed Order",
            variant : "destructive"
          })
        }
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
    if(isPaymentSuccess){
      toast({
        title: "Success",
        description: "Successfully Logged In",
      })
    }
  };
  const updateCartQuantity = async({cartProductId,quantity} :any) => {
    if(quantity === 0){
      await removeProductFromCart({cartProductId,quantity});
      return 
    }
    await updateQuantity({cartProductId : product._id,quantity : product.quantity-1 })
  }
  const handleRemoveFromCart = async(cartProductId : any) => {
    try {
      await removeProductFromCart(cartProductId);
      toast({
        title : "Success",
        description : "Successfully Removed From Cart",
        variant : "cart"
      })
    } catch (error) {
      console.log(error);
      console.log(products);
      
      if(products && products.length === 1){
        toast({
          title : "Success",
          description : "Successfully Removed From Cart",
          variant : "cart"
        })
        return
      }
      toast({
        title : "Failed",
        description : "Failed to Remove From Cart",
        variant : "destructive"
      })
    }

  }
  const handleMoveToWishlist = async({cartProductId,productId, varietyId, sizeOptionId}: {cartProductId : string,productId: string, varietyId: string, sizeOptionId: string}) => {
    try {
      await addToWishlist({productId,varietyId,sizeOptionId});
      await removeProductFromCart(cartProductId)
      toast({
        title : "Success",
        description : "Successfully Added To Wishlist And Removed From Cart",
        variant : "wishlist"
      })
    } catch (error) {
      if(products && products.length === 1){
        toast({
          title : "Success",
          description : "Successfully Removed From Cart",
          variant : "cart"
        })
        return
      }
      toast({
        title : "Failed",
        description : "Failed to Add To Wishlist",
        variant : "destructive"
      })
    }

  }
  return (
    <>
    <Navigation/>  
  {isLoading && !isFetched ? <ShoppingCartSkeleton/> : products &&  <div className="p-5 sm:px-10 flex h-full flex-col sm:flex-row justify-between items-start">
      <div className="left sm:p-10 w-full sm:w-[70%]">
        <div className="flex justify-between items-center sm:mb-0 mb-5">
          <h1 className="font-semibold text-base sm:text-xl">Shopping cart</h1>
          <h1 className="text-base sm:text-lg">Total: ₹{totalCartAmount}</h1>
        </div>
        {
          products.length === 0 ? (
            <h1 className="text-3xl text-center m-5">No Products Found</h1>
          ) : 
          products.map((product : ICartItems,index : number) => (
            <div key={index} className="w-full flex justify-start items-start sm:items-center h-auto sm:h-40 p-1 border rounded-sm my-3">
            <img
              className="h-full w-[20%] border rounded-sm object-cover"
              src={product.imageUrl}
              alt="Cart Product Image"
            />
            <div className="h-full w-[80%] sm:p-2">
              <div className="upper w-full flex p-1 sm:p-3 justify-between items-start flex-col sm:flex-row h-[80%]">
                <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
                  <h2 className="text-sm font-semibold">{product.title}</h2>
                  <div className="flex items-center gap-5">
                  <h3 className="text-sm">
                    Color : 
                    <div
                      className="inline-block border rounded-sm h-3 w-3 "
                    >{product.color}</div>
                   
                  </h3>
                  <h4> Size · {product.size}</h4>
                  </div>

                  <div className="flex justify-start gap-1 items-center w-full mt-2">
                    <p className="text-[15px] font-semibold">QTY</p>
                    <span
                      className="py-0 px-2 text-lg border mr-1 font-semibold cursor-pointer"
                      onClick={()=> updateQuantity({cartProductId : product._id,quantity : product.quantity+1 })}
                    >
                      +
                    </span>
                    <span className="text-lg mr-1 font-semibold">{product.quantity}</span>
                    <span
                      className="py-0 px-2 text-lg border mr-2 font-semibold cursor-pointer"
                      onClick={() => updateCartQuantity({cartProductId : product._id,quantity : product.quantity-1})}
                    >
                      -
                    </span>
                  </div>
                </div>
                <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-0 sm:flex-col sm:w-[20%]">
                  <div className="flex items-center justify-center gap-3">
                  <h1 className="font-semibold text-sm sm:text-xl my-1 sm:my-0">
                    ₹{product.discountedPrice}
                  </h1>
                  <h1 className="font-semibold text-sm sm:text-xl my-1 sm:my-0 text-slate-400 line-through">
                  ₹{product.originalPrice}
                  </h1>
                  </div>
                  <h3 className="inline-block text-base sm:text-md font-semibold text-green-600">
                    {totalDiscount(product.discountedPrice,product.originalPrice)}%
                  </h3>
                </div>
              </div>
              <div className="lower h-[20%] w-full">
                <div className="flex h-full w-full justify-start items-center p-1 sm:p-3 sm:py-4">
                  <div onClick={() => handleRemoveFromCart(product._id)} className="remove text-slate-400 text-sm pr-7 font-semibold cursor-pointer border-r-2">
                    REMOVE
                  </div>
                  <div onClick={() => handleMoveToWishlist({cartProductId : product._id,productId : product.productId,sizeOptionId : product.sizeOptionId,varietyId : product.varietyId})} className="move text-red-500 text-sm pl-7 font-semibold cursor-pointer">
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
          <h2>₹{totalMrp}</h2>
        </div>
        <div className="flex justify-between items-center py-0 sm:py-2 text-base">
          <h2>Discount on MRP</h2>
          <h2>{totalCartDiscount}</h2>
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
          Free delivery order over ₹99
        </div>
        <div onClick={() => toast({title : "Sorry",description : "This feature is not implemented yet!",variant : "sorry"})} className="py-4 text-center px-6 border text-green-600 my-3 cursor-pointer rounded-md">
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
            <h2 className="font-bold text-left sm:text-xl text-2xl">₹{totalCartAmount}</h2>
          </div>
          <div onClick={handlePayment} className="btn px-3 py-4 w-1/2 sm:w-full text-center cursor-pointer bg-slate-700 text-white font-semibold my-3 rounded-lg">
           {isOrderCreating ?   <div className="flex items-center justify-center gap-3">
          <img width={20} src="/Loader.svg" alt="Loading..." />
          Loading
        </div> :  "CHECKOUT"}
          </div>
        </div>
      </div>
    </div>}
    <Footer/> 
    </>
  );
};

export default ShoppingCart;