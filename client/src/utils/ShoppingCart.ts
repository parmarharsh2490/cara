import { useRemoveFromCart, useUpdateQuantity } from "@/query/cart.queries";
import { useCreateOrder, usePaymentHandler } from "@/query/orders.queries";
import { useAddToWishlist } from "@/query/wishlist.queries";
import { IUpdateCartQuantity } from "@/types";
export const useShoppingCart = () => {
  const { mutateAsync: paymentHandler } = usePaymentHandler();
  const { mutateAsync: removeProductFromCart } = useRemoveFromCart();
  const { mutateAsync: addToWishlist } = useAddToWishlist();
  const { mutateAsync: updateQuantity } = useUpdateQuantity();
  const { mutateAsync: createOrder, isPending: isOrderCreating } = useCreateOrder();

  const handlePayment = async (totalCartAmount: number) => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      console.error("Failed to load Razorpay script");
      return;
    }

    const orderId = await createOrder(totalCartAmount);
    if (!orderId) {
      console.error("Order creation failed");
      return;
    }

    const options = {
      key: import.meta.env.RAZORPAY_API_KEY,
      amount: totalCartAmount,
      currency: "INR",
      name: "Sara-Ecommerce",
      description: "Test Transaction - No actual payment.",
      order_id: orderId,
      handler: async (response: any) => {
        try {
          await paymentHandler({ paymentResponse: response, totalCartAmount });
        } catch (error) {
          console.error("Payment processing failed", error);
        }
      },
      prefill: {
        name: "John Doe", // Replace with dynamic user data
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const updateCartQuantity = async ({
    cartProductId,
    quantity,
  }: IUpdateCartQuantity) => {
    if (quantity === 0) {
      await removeProductFromCart(cartProductId);
    } else {
      await updateQuantity({ cartProductId, quantity });
    }
  };

  const handleRemoveFromCart = async (cartProductId: string) => {
    await removeProductFromCart(cartProductId);
  };

  const handleMoveToWishlist = async ({
    cartProductId,
    productId,
    varietyId,
    sizeOptionId,
  }: {
    cartProductId: string;
    productId: string;
    varietyId: string;
    sizeOptionId: string;
  }) => {
    await addToWishlist({ productId, varietyId, sizeOptionId });
    await removeProductFromCart(cartProductId);
  };

  return {
    handlePayment,
    updateCartQuantity,
    handleMoveToWishlist,
    handleRemoveFromCart,
    isOrderCreating,
  };
};
