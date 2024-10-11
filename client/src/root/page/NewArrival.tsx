import { useEffect, useState } from 'react';
import ProductList from '../../components/shared/ProductList'
import {  useGetLatestProducts } from '../../query/ProductQueries';

const NewArrival = () => {
  const [skip,setSkip] = useState(0);
  const [products,setProducts] = useState<any>([]);
   const {data : newProducts,isLoading, error : isError} = useGetLatestProducts(skip);
   useEffect(() => {
    if (newProducts?.length > 0) {
      setProducts((prevOrders : any) => {
        return [...prevOrders, ...newProducts]; 
      });
    }
  }, [newProducts]); 
  const loadMore = () => {
    setSkip((prevSkip) => prevSkip + 10);
  };
  return (
    <>
            <div className='flex flex-col items-center justify-center mt-10 border'>
        <h1 className='font-semibold text-2xl sm:text-3xl sm:mb-2'>New Arrival</h1>
        <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-7 '>Upgrade your wardrobe with our must-have shirts</p>
         {products.length > 0 && <ProductList loadMore={loadMore} products={products} isError={isError ? true : false} buttonLoading={isLoading}  productLoading={products.length === 0 ? true : false}/>}

    </div>
  </>
  )

}

export default NewArrival