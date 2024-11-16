import { IProduct } from "@/types";
import { productDiscountPercentage } from "@/utils/productDiscountPercentage";
import { useNavigate } from "react-router-dom";

const Product = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  return (
    <div key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
      <img
        src={product.imageUrl || "/default-image.jpg"}
        loading="lazy"
        className=" hover:scale-105 transition-all bg-cover max-h-72 min-h-72"
        alt="Product Image"
      />
      {/* <FaRegHeart className='relative -top-64 left-48 scale-125 border rounded-full bg-cover border-blue-900 bg-white z-10'/> */}
      <div className="flex sm:flex-row flex-col items-start sm:items-center pl-4 sm:p-0 justify-between mt-1">
        <p className="font-bold ">
          {product.title
            ? product.title.toString().length > 15
              ? `${product.title.toString().substring(0, 15)}...`
              : product.title
            : "default title"}
        </p>
        {product.quantity && (
          <p className="text-sm text-gray-600">
            ({product?.quantity} quantities sold)
          </p>
        )}
      </div>
      <div className="flex justify-between items-center px-1 my-2 whitespace-nowrap">
        <p className="font-bold text-xs sm:text-sm xl:text-base mr-1">
          ₹{product?.discountedPrice || 0}
        </p>
        <p className="">
          <span className="text-slate-600 text-xs sm:text-sm xl:text-base line-through mr-1">
            ₹{product.originalPrice || 0}
          </span>
          <span className="text-green-800 text-xs sm:text-sm xl:text-base font-bold">
            (
            {product.discountedPrice && product.originalPrice
              ? productDiscountPercentage({
                  discountedPrice: product.discountedPrice,
                  originalPrice: product.originalPrice,
                })
              : 0}
            % off)
          </span>
        </p>
      </div>
      <button
        aria-label="Product Details"
        className="border border-black p-1 sm:p-2 hover:bg-slate-800 hover:text-white transition-all duration-500 w-full text-sm sm:text-base"
      >
        View Details
      </button>
    </div>
  );
};

export default Product;
