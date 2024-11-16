import { useEffect, useState } from 'react';
import ProductList from '../../components/shared/ProductList'
import {  useGetTopSelledProducts } from '../../query/product.queries';
const SeasonProducts = () => {
  const [skip,setSkip] = useState(0);
  const [products,setProducts] = useState<any>([]);
    const {data : newProducts,isFetching,error : isError} = useGetTopSelledProducts(skip);
    useEffect(() => {
      if(newProducts?.length>0){
        setProducts([...products,...newProducts])
      }
    }, [newProducts])
    const loadMore = () => {
      setSkip((prevSkip) => prevSkip + 10);
    };
  return (
    <div className='flex flex-col items-center justify-center mt-4'>
        <h1 className='sm:text-3xl text-2xl text-center'>Season's Best Collections</h1>
        <p className='text-gray-700 text-sm  sm:text-base mb-10'>Discover the latest trends in streetwear</p>
        <ProductList buttonLoading={isFetching} loadMore={loadMore} products={products} isError={isError ? true : false} productLoading={products.length === 0}/>
    </div>
  )
}

export default SeasonProducts