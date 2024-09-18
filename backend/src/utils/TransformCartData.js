export const transformCartData = (cartData) => {
    return cartData.map((item) => {
      const { product, sizeOption, variety, quantity } = item;
      
      // Find the selected variety and sizeOption
      const selectedVariety = product.variety.find((v) => v._id.toString() === variety.toString());
      const selectedSize = selectedVariety.sizeOptions.find((s) => s._id.toString() === sizeOption.toString());
  
      // Select the first image (if available)
      const selectedImage = selectedVariety.images[0]?.imageUrl || "default_image_url";
  
      return {
        _id: item._id,
        title: product.title,
        color: selectedVariety.color,
        size: selectedSize.size,
        discountedPrice: selectedSize.price.discountedPrice,
        originalPrice: selectedSize.price.discountedPrice,
        quantity: quantity,
        imageUrl: selectedImage,
      };
    });
  };
  