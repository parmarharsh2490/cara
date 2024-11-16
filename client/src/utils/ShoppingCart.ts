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
    const orderId = await createOrder(totalCartAmount);
    if (!orderId) return;

    const options = {
      key: import.meta.env.RAZORPAY_API_KEY,
      amount: totalCartAmount,
      currency: "INR",
      name: "Cara",
      description: "Test Transaction dont worry just click it will not cut any money enter fake otp",
      order_id: orderId,
      handler: async (response: any) => {
        await paymentHandler({ paymentResponse: response, totalCartAmount });
      },
      prefill: {
        name: "John Doe",
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
      return;
    }

    // Set the pending update which will trigger the debounced update
    updateQuantity({ cartProductId, quantity });
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