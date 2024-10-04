import { useState } from 'react'
import ProductList from '../../components/shared/ProductList'
import { IProduct } from '@/types'
const SeasonProducts = () => {
    const [products] = useState<IProduct[]>([
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
        {
            imageUrl : "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
            _id : "12345678",
            title : "Light blue cargo",
            price : "2000",
            discountedPrice : "1700"
        },
    ])
  return (
    <div className='flex flex-col items-center justify-center mt-4'>
        <h1 className='sm:text-3xl text-2xl text-center'>Season's Best Collections</h1>
        <p className='text-gray-400 text-sm  sm:text-base mb-10'>Discover the latest trends in streetwear</p>
        <ProductList products={products} isLoading={true}/>
    </div>
  )
}

export default SeasonProducts