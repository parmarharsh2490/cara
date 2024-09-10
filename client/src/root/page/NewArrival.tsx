import { useState } from 'react'
import ProductList from '../../components/shared/ProductList'
import { IProduct } from '@/types'
import { getLatestProducts, useGetLatestProducts } from '../../query/queries';
import { useQuery } from '@tanstack/react-query';
const NewArrival = () => {
   const {data : products,isLoading,error,isFetched,isFetching} = useGetLatestProducts();
  return (
    <>
    {
        isLoading || isFetching ? (
            <p>Loading ...</p>
        ) : (
            <div className='flex flex-col items-center justify-center mt-10 border'>
        <h1 className='font-semibold text-2xl sm:text-3xl sm:mb-2'>New Arrival</h1>
        <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-7 '>Upgrade your wardrobe with our must-have shirts</p>
        {products &&  <ProductList products={products}/>}
    </div>
        )
    }
  </>
  )

}

export default NewArrival