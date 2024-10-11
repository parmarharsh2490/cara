import { useGetUserWishlist, useRemoveFromWishlist } from '../../query/WishlistQueries';
import { useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [skip, setSkip] = useState<number>(0);
    const navigate = useNavigate()    
    const { data: products, isLoading,error,isFetched } = useGetUserWishlist(skip);
    const {mutateAsync : removeFromWishlist} = useRemoveFromWishlist();


    if (isLoading || !isFetched) {
        return  <div className='h-screen sm:h-[20rem] w-full sm:w-[90vw] px-2 py-8 sm:px-10 sm:pt-10 flex justify-start sm:gap-2 flex-wrap sm:flex-nowrap'> 
        <div className={` w-1/2 h-2/5 sm:h-full sm:min-h-96 sm:w-[20%] p-0 sm:p-2 mt-2 `} >
              {/* <div className='h-5 w-16 bg-slate-200 animate-pulse'></div> */}
           <div className='w-full h-[80%] sm:h-[80%] relative'>
           <div className='w-full h-full group bg-slate-200 animate-pulse'/>
           </div>
           <div className="text-black p-1 h-5 w-16 bg-slate-200 animate-pulse tracking-tighter sm:font-bold mt-2 sm:text-sm"></div>
           <div className='flex justify-between p-1 items-center'>
            <p className="font-bold my-1 h-5 w-10 bg-slate-200 animate-pulse"></p>
            <div className='flex'>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            </div>
           </div>
           <button className='w-full p-1 h-10 bg-slate-200 animate-pulse  duration-500 border-slate-800 hover:text-white'></button>
        </div>
        <div className={` w-1/2 h-2/5 sm:h-full sm:min-h-96 sm:w-[20%] p-0 sm:p-2 mt-2 `} >
              {/* <div className='h-5 w-16 bg-slate-200 animate-pulse'></div> */}
           <div className='w-full h-[80%] sm:h-[80%] relative'>
           <div className='w-full h-full group bg-slate-200 animate-pulse rounded-lg'/>
           </div>
           <div className="text-black p-1 h-5 w-16 bg-slate-200 animate-pulse tracking-tighter sm:font-bold mt-2 sm:text-sm"></div>
           <div className='flex justify-between p-1 items-center'>
            <p className="font-bold my-1 h-5 w-10 bg-slate-200 animate-pulse"></p>
            <div className='flex'>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            </div>
           </div>
           <button className='w-full p-1 h-10 bg-slate-200 animate-pulse  duration-500 border-slate-800 hover:text-white'></button>
        </div>
        <div className={` w-1/2 h-2/5 sm:h-full sm:min-h-96 sm:w-[20%] p-0 sm:p-2 mt-2 `} >
              {/* <div className='h-5 w-16 bg-slate-200 animate-pulse'></div> */}
           <div className='w-full h-[80%] sm:h-[80%] relative'>
           <div className='w-full h-full group bg-slate-200 animate-pulse'/>
           </div>
           <div className="text-black p-1 h-5 w-16 bg-slate-200 animate-pulse tracking-tighter sm:font-bold mt-2 sm:text-sm"></div>
           <div className='flex justify-between p-1 items-center'>
            <p className="font-bold my-1 h-5 w-10 bg-slate-200 animate-pulse"></p>
            <div className='flex'>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            </div>
           </div>
           <button className='w-full p-1 h-10 bg-slate-200 animate-pulse  duration-500 border-slate-800 hover:text-white'></button>
        </div>
        <div className={` w-1/2 h-2/5 sm:h-full sm:min-h-96 sm:w-[20%] p-0 sm:p-2 mt-2 `} >
              {/* <div className='h-5 w-16 bg-slate-200 animate-pulse'></div> */}
           <div className='w-full h-[80%] sm:h-[80%] relative'>
           <div className='w-full h-full group bg-slate-200 animate-pulse'/>
           </div>
           <div className="text-black p-1 h-5 w-16 bg-slate-200 animate-pulse tracking-tighter sm:font-bold mt-2 sm:text-sm"></div>
           <div className='flex justify-between p-1 items-center'>
            <p className="font-bold my-1 h-5 w-10 bg-slate-200 animate-pulse"></p>
            <div className='flex'>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            <div className='bg-slate-200 animate-pulse h-2 w-2 rounded-full'></div>
            </div>
           </div>
           <button className='w-full p-1 h-10 bg-slate-200 animate-pulse  duration-500 border-slate-800 hover:text-white'></button>
        </div>
           
        </div>
    }

    const updatePage = (value: number) => {
        setSkip((prev) => prev + value)
    };

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
                    {
                        error ? "No Products Found" : products && products.map((product: any, index: number) => (
                            <div
                                key={index}
                                className={`flex flex-col w-full shadow-lg sm:p-5 ${skip && 'hidden'}`}>
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
                                    <button onClick={() => removeFromWishlist({wishlistId : product?._id})} className='sm:w-[48%] w-full text-xs p-1 border text-red-600 font-semibold duration-500 border-red-600 hover:text-red-600'>
                                        Remove
                                    </button>
                                    <button onClick={() => navigate(`/product/${product._id}`)} className='sm:w-[48%] w-full text-xs p-1 border hover:bg-slate-800 font-semibold duration-500 border-slate-800 hover:text-white'>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                <button className='' disabled={products.length < 4}>
                <GrNext
                    onClick={() => updatePage(4)}
                    size={25}
                    className={`${products?.length < 4? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} hidden sm:block`}
                />
                </button>

            </div>
            {/* Mobile Pagination */}
            <div className='flex w-full sm:hidden items-center justify-between mx-5 my-5'>
                <GrPrevious
                    onClick={() => updatePage(-4)}
                    size={25}
                    className={`${skip === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                />
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
