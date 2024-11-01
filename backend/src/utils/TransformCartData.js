export const transformCartData = (cartData) => {
  if (!cartData || cartData.length === 0) {
    return [];
  }

  return cartData.map((item) => {
    const { product, sizeOption, variety, quantity } = item;

    const selectedVariety = product.variety.find((v) => v._id.toString() === variety.toString());
    const selectedSize = selectedVariety.sizeOptions.find((s) => s._id.toString() === sizeOption.toString());

    const selectedImage = selectedVariety.images[0]?.imageUrl;

    return {
      inStock: true,
      productId: product._id,
      sizeOptionId: selectedSize._id,
      varietyId: selectedVariety._id,
      _id: item._id,
      title: product.title,
      color: selectedVariety.color,
      size: selectedSize.size,
      discountedPrice: selectedSize.price.discountedPrice,
      originalPrice: selectedSize.price.originalPrice,
      quantity: quantity,
      imageUrl: selectedImage,
    };
  });
};
