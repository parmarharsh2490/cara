import { IProduct } from '@/types'
import Product from './Product'

const ProductList = ({ products} : {products : IProduct[]}) => {
  return (
    <div className='flex items-center justify-center flex-col lg:mx-7 mx-2'>
      {/* Container with padding and start alignment */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-start sm:justify-items-center lg:justify-items-start'>
        {
          products.map((product : IProduct) => (
            <Product  product={product} />
          ))
        }
      </div>
      <button className="py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 my-5">
        VIEW ALL PRODUCTS
      </button>
    </div>
  )
}

export default ProductList