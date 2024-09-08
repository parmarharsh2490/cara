
import { IProduct } from '@/types';
import { Link } from 'react-router-dom';

const Product = ({product} : {product : IProduct}) => {
  console.log(product);
  
  return (
    <div key={product._id}>
                    <img src={product.imageUrl} className=' hover:scale-105 transition-all bg-cover'  alt="" />
                    {/* <FaRegHeart className='relative -top-64 left-48 scale-125 border rounded-full bg-cover border-blue-900 bg-white z-10'/> */}
                    <p className='font-bold mt-1'>{product.title}</p>
                    <div className='flex justify-between items-center px-1 my-2'>
                        <p className='font-bold text-xs sm:text-base mr-1'>₹{product.discountedPrice}</p>
                        <p className=''>
                          <span className='text-slate-400 text-xs sm:text-base line-through mr-1'>₹{product.price}</span>
                          <span className='text-green-600 text-xs sm:text-base font-bold'>(33% off)</span>
                        </p>
                    </div>
                    <button className='border border-black p-1 sm:p-2 hover:bg-slate-800 hover:text-white transition-all duration-500 w-full text-sm sm:text-base'><Link to={`/product/${product._id}`}>View Details</Link></button>
                </div>
  )
}

export default Product