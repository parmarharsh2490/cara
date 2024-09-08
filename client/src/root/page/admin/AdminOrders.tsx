import { IOrder } from '@/types';
import React, { useState } from 'react';


const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([
    {
      id: 1,
      items: [
        { image: '/blog1.jpg', title: 'Men Printed Pure Cotton Straight Kurta', price: 1499 },
        { image: '/blog2.jpg', title: 'Women Cotton Salwar Suit', price: 1999 },
        { image: '/blog3.jpg', title: 'Kids Printed T-Shirt', price: 599 },
        { image: '/blog1.jpg', title: 'Men Printed Pure Cotton Straight Kurta', price: 1499 },
        { image: '/blog2.jpg', title: 'Women Cotton Salwar Suit', price: 1999 },
        { image: '/blog3.jpg', title: 'Kids Printed T-Shirt', price: 599 },
        { image: '/blog1.jpg', title: 'Men Printed Pure Cotton Straight Kurta', price: 1499 },
        { image: '/blog2.jpg', title: 'Women Cotton Salwar Suit', price: 1999 },
        { image: '/blog3.jpg', title: 'Kids Printed T-Shirt', price: 599 },
      ],
      totalPrice: 4097,
      status: 'DELIVERED'
    },
    {
      id: 52,
      items: [
        { image: '/blog4.jpg', title: 'Men Formal Shoes', price: 2499 },
        { image: '/blog5.jpg', title: 'Women Designer Handbag', price: 3999 },
      ],
      totalPrice: 6498,
      status: 'SHIPPED'
    },
    {
      id: 103,
      items: [
        { image: '/blog1.jpg', title: 'Unisex Sports Watch', price: 1299 },
      ],
      totalPrice: 1299,
      status: 'PLACED'
    },
  ]);

  const handleStatusChange = (id: number, newStatus: IOrder['status']) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
    alert(`Order #${id} status updated to ${newStatus}`);
  };

  const getStatusStyles = (status: IOrder['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-600';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-600';
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-600';
      case 'PLACED':
        return 'bg-green-50 text-green-600'; // Light green background for PLACED status
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <div className='flex items-center justify-between mb-6 flex-col sm:flex-row'>
        <h1 className="text-2xl md:text-3xl font-bold">All Orders</h1>
        <div className="flex gap-2 items-center mt-4 md:mt-0">
          <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">Sort By</label>
          <select name="sortby" id="sortby" className="py-2 text-sm md:text-base">
            <option value="Latest" selected>
              Latest
            </option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="priceLowToHigh">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="hidden md:table min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm md:text-base">Image</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Title</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Price</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Status</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="relative w-12 h-12">
                        <img src={item.image} alt={item.title} className="object-cover w-full h-full rounded-full" />
                        {order.items.length > 2 && index === 1 && (
                          <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-full">
                            +{order.items.length - 2}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm md:text-base">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-gray-600 text-xs md:text-sm">+{order.items.length - 2} more</p>
                  )}
                </td>
                <td className="px-4 py-2 text-center text-sm md:text-base">₹{order.totalPrice}</td>
                <td className="px-4 py-2">
                  <p className={`px-4 py-2 text-center rounded-3xl font-semibold ${getStatusStyles(order.status)}`}>{order.status}</p>
                </td>
                <td className="px-4 py-2 text-center">
                  <select
                    onChange={(e) => handleStatusChange(order.id, e.target.value as IOrder['status'])}
                    value={order.status}
                    className="bg-white hover:bg-gray-100 text-gray-700 py-1 px-2 rounded text-sm md:text-base"
                  >
                    <option value="PLACED">PLACED</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:hidden">
          {orders.map((order) => (
            <div key={order.id} className="border-b border-gray-200 mb-4">
              <div className="flex flex-col sm:flex-row mb-4">
                <div className="flex flex-row items-start space-x-2">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="relative w-20 h-20">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-full rounded-full" />
                      {order.items.length > 2 && index === 1 && (
                        <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-full">
                          +{order.items.length - 2}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-between ml-4">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-gray-600 text-sm">+{order.items.length - 2} more</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center text-sm md:text-base">
                <span>₹{order.totalPrice}</span>
                <span className={`px-4 py-2 rounded-3xl font-semibold ${getStatusStyles(order.status)}`}>{order.status}</span>
                <select
                  onChange={(e) => handleStatusChange(order.id, e.target.value as IOrder['status'])}
                  value={order.status}
                  className="bg-white hover:bg-gray-100 text-gray-700 py-1 px-2 rounded text-sm"
                >
                  <option value="PLACED">PLACED</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
