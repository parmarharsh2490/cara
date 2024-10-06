import { ICartItems } from "@/types";

export const countTotalCartAmount = (cartProducts : ICartItems[]) => {
    let totalCartAmount = 0;
    let totalCartDiscount = 0;
    cartProducts.map((cartProduct) => {
        totalCartDiscount+=cartProduct.price.originalPrice * cartProduct.quantity;
        totalCartAmount+=cartProduct.price.discountedPrice * cartProduct.quantity;
    })
    let totalMrp = totalCartAmount + totalCartDiscount
    return {totalCartAmount,totalCartDiscount,totalMrp}
}

export const totalDiscount = (discountedPrice : number,originalPrice : number) => {
    const discount = ((originalPrice-discountedPrice)/originalPrice) * 100
    return discount
}
