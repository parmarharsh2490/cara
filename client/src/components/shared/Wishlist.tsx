import WishlistSkeleton from '@/utils/skeleton/WishlistSkeleton';
import { useGetUserWishlist, useRemoveFromWishlist } from '../../query/wishlist.queries';
import { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { IWishlistProduct } from '@/types';

const Wishlist = () => {
    const [skip, setSkip] = useState<number>(0);
    const navigate = useNavigate();    
    const { data: products, isLoading,isFetched,isError } = useGetUserWishlist(skip);
    const {mutateAsync : removeFromWishlist} = useRemoveFromWishlist();
    const updatePage = (value: number) => {
        setSkip((prev) => prev + value)
    };
    if(isError || products?.length === 0){
        return (
        <div className='flex items-center justify-center'>
         <GrPrevious
                    onClick={() => updatePage(-4)}
                    size={25}
                    className={`${skip === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} h-full my-auto ml-5`}
                />
        <div className=" w-full h-[60vh] sm:h-auto sm:p-10 p-5 flex-col flex justify-center items-center">
            <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?w=740&amp;t=st=1703961108~exp=1703961708~hmac=1144a81753ebea9c937ae58ad507639a51a9bb7697a8d0956ddc0fbd54d6046c" alt="wishlist is empty" className=" w-auto h-60"/>
            <h2 className="text-slate-500 text-xl -mt-2">Nothing found.</h2>
            </div>
            <GrNext
                    size={25}
                    className={`${skip === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} h-full my-auto mr-5`}
                />
        </div>
        )

    }

    if (isLoading || !isFetched) {
        return  <WishlistSkeleton/>
    }

  

    return (
        <div className='flex flex-col justify-center items-center sm:gap-15 lg:mx-4 sm:w-[85%]'>
            <h1 className='font-semibold text-xl sm:text-2xl'>Your WishList</h1>
            <div className='flex items-center lg:gap-5'>
            <button className='' disabled={skip === 0}>
                <GrPrevious
                    onClick={() => updatePage(-4)}
                    size={25}
                    className={`${skip === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} hidden sm:block`}
                />
                </button>
                <div className='max-w-[100%] justify-center gap-3 overflow-x-scroll grid grid-cols-2 lg:grid-cols-4'>
                       {products && products.length>0 &&  products.map((product: IWishlistProduct, index: number) => (
                            <div
                                key={index}
                                className={`flex flex-col w-full shadow-lg sm:p-5 ${skip && ''}`}>
                                <img src={product.imageUrl} className='sm:max-w-[250px] bg-cover' alt='' />
                                <h1 className='sm:font-bold sm:text-sm tracking-tighter p-1 text-black'>{product.title}</h1>
                                <div className='flex justify-between p-1 items-center'>
                                    <p className='sm:font-bold sm:text-sm text-xs text-[9px] sm:my-1'>₹{product.discountedPrice}</p>
                                    <div className='flex justify-center items-center text-xs'>
                                        <s className='sm:mr-1 text-xs text-[9px] text-slate-400'>₹2199</s>
                                        <p className='font-bold sm:my-1 text-xs text-[8px] text-green-600'>(33% off)</p>
                                    </div>
                                </div>
                                <div className='w-full flex justify-between gap-1 items-center sm:flex-row flex-col'>
                                    <button onClick={() => removeFromWishlist({wishlistId : product._id})} className='sm:w-[48%] w-full text-xs p-1 border text-red-600 font-semibold duration-500 border-red-600 hover:text-red-600'>
                                        Remove
                                    </button>
                                    <button onClick={() => navigate(`/product/${product.productId}`)} className='sm:w-[48%] w-full text-xs p-1 border hover:bg-slate-800 font-semibold duration-500 border-slate-800 hover:text-white'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <button  disabled={products?.length < 4}>
                <GrNext
                    onClick={() => updatePage(4)}
                    size={25}
                    className={`${products?.length < 4? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} hidden sm:block`}
                />
                </button>

            </div>
            {/* Mobile Pagination */}
            <div className='flex w-full sm:hidden items-center justify-center gap-3 mx-5 my-5'>
                <GrPrevious
                    onClick={() => updatePage(-4)}
                    size={25}
                    className={`${skip === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
                <p className='rounded-full bg-blue-300 px-4 py-3'>{skip/4+1}</p>
                <GrNext
                    onClick={() => updatePage(4)}
                    size={25}
                    className={`${products?.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
            </div>
        </div>
    );
};

export default Wishlist;
