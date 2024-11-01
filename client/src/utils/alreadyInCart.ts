import { ICartItems } from "@/types";

export const alreadyInCart = ({
  productId,
  sizeOptionId,
  cartItems,
}: {
  productId: string;
  sizeOptionId: string;
  cartItems: ICartItems[] | [];
}) => {
  if (!productId || !sizeOptionId || !cartItems?.length) {
    return false;
  }

  return cartItems.some(
    (cartProduct: ICartItems) =>
      cartProduct.productId === productId &&
      cartProduct.sizeOptionId === sizeOptionId
  );
};
