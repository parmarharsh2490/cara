export const transformedWishlist = (userWishList) => {
  return userWishList.products.map((data) => {
    if (data.product && data.product.variety) {

      const variety = data.product.variety.find(
        (v) => v._id.toString() === data.varietyId.toString()
      );

      const sizeOption = variety?.sizeOptions.find(
        (s) => s._id.toString() === data.sizeOptionId.toString()
      );

      return {
        _id : data._id,
        title: data.product.title,
        imageUrl: variety?.images[0]?.imageUrl || null, 
        originalPrice: sizeOption ? sizeOption.price.originalPrice : null, 
        discountedPrice: sizeOption ? sizeOption.price.discountedPrice : null, 
      };
    }

    return null;
  }).filter(item => item !== null);
};
