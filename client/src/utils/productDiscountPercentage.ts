export const productDiscountPercentage = ({discountedPrice,originalPrice} : any) => {
    return (((originalPrice - discountedPrice) / originalPrice) * 100).toString().substr(0,4);
}