import { useEffect, useState } from 'react';
import ProductList from '../../components/shared/ProductList'
import {  useGetLatestProducts } from '../../query/product.queries';

const NewArrival = () => {
  const [pageParam,setPageParam] = useState(0);
  const [products,setProducts] = useState<any>([]);
   const {data : newProducts, error : isError,isFetching} = useGetLatestProducts(pageParam);
   useEffect(() => {
    if (newProducts?.length > 0) {
      setProducts((prevOrders : any) => {
        return [...prevOrders, ...newProducts]; 
      });
    }
  }, [newProducts]);

  const loadMore = () => {
    setPageParam((prevPageParam) => prevPageParam + 1);
  };
  return (
    <>
            <div className='flex flex-col items-center justify-center mt-10 border'>
        <h1 className='font-semibold text-2xl sm:text-3xl sm:mb-2'>New Arrival</h1>
        <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-7 '>Upgrade your wardrobe with our must-have shirts</p>
        <ProductList loadMore={loadMore} products={products} isError={isError ? true : false} buttonLoading={isFetching}  productLoading={products.length === 0 ? true : false}/>

    </div>
  </>
  )

}

export default NewArrival