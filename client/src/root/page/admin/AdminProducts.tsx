import { useDeleteProduct } from '../../../query/ProductQueries.ts';
import { IProduct } from '@/types';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const products: IProduct[] = [
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price: "100" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog1.jpg', title: 'Dummy Product 1', price:"100"},
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog2.jpg', title: 'Dummy Product 2', price: "200" },
  { _id : "123456789", discountedPrice : "12345", imageUrl: '/blog2.jpg', title: 'Dummy Product 2', price: "200" },
  // Add more dummy products as needed
];

const AdminProducts: React.FC = () => {
  const {mutateAsync : deleteProduct} = useDeleteProduct();
  const navigate = useNavigate();
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sr No.</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Picture</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{product.title}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">
                 <div className='flex items-center justify-center'> <img src={product.imageUrl} alt={product.title} className="max-w-12 h-auto" /> </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center justify-center">
                    <button  onClick={() => navigate(`/update-product/${product._id}`)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button onClick={() => deleteProduct(product._id)}  className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
