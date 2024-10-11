import { IProduct } from '@/types'
import Product from './Product'


const ProductListSkeleton = ( ) => {
    return (
        <div className='flex items-center justify-center flex-col animate-pulse w-full'>
    <div className='grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-start sm:justify-items-center lg:justify-items-start pl-6'>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
        <div className='w-[90%]'>
            <div className='bg-gray-200 h-72  w-full rounded-lg'></div>
            <p className='h-4 my-2 bg-gray-200 rounded w-full'></p>
            <div className='flex justify-between items-center px-1 my-2'>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
                <div className='h-4 bg-gray-200 w-24 rounded'></div>
            </div>
            <div className='p-1 sm:p-2 w-full text-sm sm:text-base h-10 bg-slate-400'></div>
        </div>
    
    </div>
    <button className="py-[6px] px-12 w-48 text-base font-bold bg-slate-800 text-white my-5 h-10">
    </button>
</div>
    )
}
const ProductList = ({loadMore, products,isError,productLoading,buttonLoading} : {products : IProduct[],buttonLoading : boolean,productLoading : boolean,isError : boolean,loadMore : any}) => {
  return (
    <>
    {
        productLoading ? (
            <ProductListSkeleton/>
        ) : (
            <div className='flex items-center justify-center flex-col lg:mx-7 mx-2'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-start sm:justify-items-center lg:justify-items-start'>
              {
               products.length === 0 && isError ? (
                <h1 className='text-3xl m-3  whitespace-nowrap'>No Products Found!</h1>
               ) : (
                 products.map((product : IProduct) => (
                  <Product key={product._id}  product={product} />
                ))
               )
              }
            </div>
            <button disabled={isError || !products.length.toString().endsWith('0')} onClick={loadMore} className={`py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 my-5 ${products.length < 1 && "hidden"}`}>
             {isError || !products.length.toString().endsWith('0') ? "No More Products Found" : buttonLoading ? "Loading..." : "VIEW ALL PRODUCTS"}
        </button>
          </div>
        )
    }
    </>
  )
}

export default ProductList