import ProductList from '../../components/shared/ProductList'
import {  useGetLatestProducts } from '../../query/queries';

const NewArrival = () => {
   const {data : products,isLoading,error,isFetching} = useGetLatestProducts();
   if(error){
    return <p>Error Happened...</p>
   }
  return (
    <>
            <div className='flex flex-col items-center justify-center mt-10 border'>
        <h1 className='font-semibold text-2xl sm:text-3xl sm:mb-2'>New Arrival</h1>
        <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-7 '>Upgrade your wardrobe with our must-have shirts</p>
         <ProductList products={products} isLoading={isLoading}/>
    </div>
  </>
  )

}

export default NewArrival