import ProductList from '../../components/shared/ProductList'
import {  useGetTopSelledProducts } from '../../query/ProductQueries';
const SeasonProducts = () => {
    const {data : products,isLoading,error} = useGetTopSelledProducts();
   if(error){
    return <p>Error Happened...</p>
   }
  return (
    <div className='flex flex-col items-center justify-center mt-4'>
        <h1 className='sm:text-3xl text-2xl text-center'>Season's Best Collections</h1>
        <p className='text-gray-400 text-sm  sm:text-base mb-10'>Discover the latest trends in streetwear</p>
        <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default SeasonProducts