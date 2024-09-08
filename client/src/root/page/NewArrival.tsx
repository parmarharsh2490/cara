import { useState } from 'react'
import ProductList from '../../components/shared/ProductList'
import { IProduct } from '@/types'
const NewArrival = () => {
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
    <div className='flex flex-col items-center justify-center mt-10 border'>
        <h1 className='font-semibold text-2xl sm:text-3xl sm:mb-2'>New Arrival</h1>
        <p className='text-slate-400 text-sm sm:text-base mb-4 sm:mb-7 '>Upgrade your wardrobe with our must-have shirts</p>
        <ProductList products={products}/>
    </div>
  )
}

export default NewArrival