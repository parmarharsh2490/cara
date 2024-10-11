import { useGetSellerOrders, useUpdateOrderStatus } from '../../../query/orderQueries';
import { IOrder } from '@/types';
import React, {  useEffect, useState } from 'react';


const AdminOrders: React.FC = () => {
  const [skip, setSkip] = useState(0); 
  const [orders, setOrders] = useState<any[]>([]);
  const { data: newOrders, isLoading, isFetching,error } = useGetSellerOrders(skip);
  useEffect(() => {
    if (newOrders?.length > 0) {
      setOrders((prevOrders) => {
        return [...prevOrders, ...newOrders]; 
      });
    }
  }, [newOrders]); 
  const {mutateAsync : updateOrderStatus} = useUpdateOrderStatus();
  const loadMoreOrders = () => {
    setSkip((prevSkip) => prevSkip + 1);
  };

  if (isLoading && orders.length === 0) {
    return <div className="container mx-auto px-4 py-8 flex flex-col">
    <div className='flex items-center justify-between mb-6 flex-col sm:flex-row'>
      <h1 className="text-2xl md:text-3xl font-bold bg-gray-200 rounded-lg h-6 w-32"></h1>
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
        <div className="bg-gray-200 rounded-lg h-8 w-36"></div>
      </div>
    </div>
  
    <div className="overflow-x-auto">
      <table className="hidden md:table min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
            </th>
            <th className="px-4 py-2">
              <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
            </th>
            <th className="px-4 py-2">
              <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
            </th>
            <th className="px-4 py-2">
              <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
            </th>
            <th className="px-4 py-2">
              <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(7).map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-8 w-24"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <div className="md:hidden space-y-4">
        {Array(7).map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-lg w-20 h-20"></div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
                <div className="bg-gray-200 rounded-lg h-4 w-20 mt-1"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
              <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
              <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-lg h-8 w-full"></div>
            </div>
          </div>
        ))}
      </div>
  
      <button
        className="mt-6 w-full bg-gray-200 rounded-lg h-12"
      ></button>
    </div>
  </div>
  
  }

  if (!isLoading && orders.length === 0) {
    return <p>No Orders Found...</p>;
  }

  

  const handleStatusChange = async(id: number, newStatus: IOrder['status']) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
    console.log(id);
    console.log(newStatus);
    
    await updateOrderStatus({orderId : id,status : newStatus})
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
              <tr key={order._id} className="border-b border-gray-200">
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    {/* {order.products.images.slice(0, 2).map((item, index) => (
                      <div key={index} className="relative w-12 h-12">
                        <img src={item.image} alt={item.title} className="object-cover w-full h-full rounded-full" />
                        {order.items.length > 2 && index === 1 && (
                          <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-full">
                            +{order.items.length - 2}
                          </span>
                        )}
                      </div>
                    ))} */}
                        <img className='bg-cover rounded-full max-w-8 bg-center' src={order.imageUrl} alt="" />
                  </div>
                </td>
                <td className="px-4 py-2 text-sm md:text-base">
                  {order.title}
                  {/* {order.items.slice(0, 2).map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-gray-600 text-xs md:text-sm">+{order.items.length - 2} more</p>
                  )} */}
                </td>
                <td className="px-4 py-2  text-sm md:text-base">₹{order.price}</td>
                <td className="px-4 py-2">
                  <p className={`px-4 py-2 rounded-3xl font-semibold ${getStatusStyles(order.status)}`}>{order.status}</p>
                </td>
                <td className="px-4 py-2">
                  <select
                    onChange={(e) => handleStatusChange(order._id, e.target.value as IOrder['status'])}
                    value={order.status}
                    className="bg-white hover:bg-gray-100 text-gray-700 py-1 px-2 rounded text-sm md:text-base"
                  >
                    <option value="success">SUCCESS</option>
                    <option value="failed">FAILED</option>
                    {/* <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option> */}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={order.imageUrl} 
                  alt={order.title} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-tight">{order.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">Order #{order._id.slice(-6)}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between text-sm">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <span className="font-medium">Price:</span>
                  <span className="text-green-600 font-semibold">₹{order.price}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <span className="font-medium">Qty:</span>
                  <span>{order.quantity}</span>
                </div>
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor={`status-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Update Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  onChange={() => handleStatusChange(order.id, order.status)}
                  value={order.status}
                  className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="success">SUCCESS</option>
                  {/* <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option> */}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center'>
      <button 
        disabled={isFetching} 
        onClick={loadMoreOrders} 
        className="mt-6 w-full whitespace-nowrap max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50"
      >
        {error ? "No More Orders" : isFetching ? "Loading..." : "Load More Orders"}
      </button>
      </div>

    </div>
    </div>
  );
};

export default AdminOrders;
