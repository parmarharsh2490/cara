import  { useRef, useState } from 'react'
import Navigation from '../../components/shared/Navigation';
import Footer from '../../components/shared/Footer';
import PromotionBanner from '../../components/shared/PromotionBanner';
import Reviews from '../../components/shared/Reviews';
import {  IProductAllDetails } from '@/types';

const ProductDetails = () => {
    const productCount = useRef<HTMLInputElement>(null)
    const [product,setProduct] = useState<IProductAllDetails>({
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
})
    
const imageClick = (indexOfImage: number) => {
    setProduct((prev) => {
        const updatedImages = prev.images.map((image, index) => {
            return index === indexOfImage ? prev.images[0] : (index === 0 ? prev.images[indexOfImage] :  image)
        });

        return {
            ...prev,
            images: updatedImages,
        };
    });
};


  return (
    <>
    <Navigation/>
    <section
      id="prodetails"
      className="gap-10 p-5 sm:px-10 flex flex-col sm:flex-row w-full items-center justify-center h-[70%]"
    >
      <div className="h-full w-full sm:w-[70%] md:w-[55%] lg:w-[35%] flex items-center   flex-col-reverse md:flex-row">
        <div className="flex gap-2 justify-center items-center flex-row md:flex-col w-full sm:w-[100%] md:w-[20%] mt-1">
          {
              product.images.map((image,index) => (
                index !== 0 &&         
                  <img
                    src={image}
                    onClick={() => imageClick(index)}
                    className="hover:scale-105 duration-500 sm:w-[100%] w-[25%] bg-cover"
                    alt="Product Thumbnail"
                  />
            ))
          }
        </div>
        <img
          src={product.images[0]}
          className="w-full  sm:w-[100%] h-full cursor-pointer bg-cover p-2"
          alt="Main Product"
        />
      </div>
      <div className="w-full sm:w-[65%] mt-7  pt-30">
        <h6 className="text-md   md:text-2xl font-semibold my-2">Home / men-shirts</h6>
        <h4 className="sm:text-lg md:text-3xl text-2xl my-2">
          Blue Structured Checks Oversized Shirt
        </h4>
        <div className="flex justify-start items-center">
          <h2 className="text-2xl sm:text-base md:text-2xl my-2 font-semibold">₹899</h2>
          <s className="mr-1 text-slate-400 mx-2 text-base">₹1099</s>
          <p className="font-bold my-1 text-green-600 text-base">(18% off)</p>
        </div>
        <select className="block py-2 px-4 mb-4 bg-white border border-gray-300 focus:outline-none">
          <option>Select Size</option>
          <option value="xl">XL</option>
          <option value="xxl">XXL</option>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
        <input
          type="number"
          className="focus:outline-none w-14 border border-1 mr-3 p-2"
          ref={productCount}
          min={0}
          max={999}
        />
        <div className="flex sm:my-2  left-0 bg-white sm:shadow-sm shadow-2xl p-1 gap-1 w-full z-10 fixed sm:relative bottom-0">
          <button className="w-1/2 max-w-[200px] p-3 mx-2 gap-2 text-base sm:relative  sm:p-0 bg-white text-black border hover:bg-slate-600 duration-500 border-slate-800 hover:text-white flex justify-center items-center rounded-md font-semibold">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
            </svg>
            WISHLIST
          </button>
          <button className="w-1/2 max-w-[200px] left-0 p-3 text-base sm:relative  sm:p-2 bg-slate-800 text-white border hover:bg-slate-600 rounded-md font-semibold duration-500 border-slate-800 hover:text-white">
            ADD TO BAG
          </button>
        </div>
        <h4 className="text-lg py-4">Product details</h4>
        <span className="leading-5 w-full">
          <p>
            Your next go-to wardrobe piece, blue structured checks oversized
            shirts for men, featuring a spread collar, drop shoulders, and full
          </p>
        </span>
      </div>
    </section>
    <Reviews/>
    <div className='mt-10'>
        <h1 className='text-center text-2xl sm:text-3xl sm:mb-2'>Similar Products</h1>
        <p className='sm:text-base text-sm text-slate-400 text-center mb:1 sm:mb-7'>You may also like</p>
        {/* <ProductList products={products}/> */}
    </div>

    <PromotionBanner/>
    <Footer/>
    </>
  )
}

export default ProductDetails