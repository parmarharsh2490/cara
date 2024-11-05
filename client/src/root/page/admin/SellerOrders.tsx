import { IOrderItem } from '@/types';
import React, { useEffect } from 'react';
import { getStatusStyles } from '@/utils/getStatusByStyle';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/utils/Spinner';
import { useGetSellerOrders, useUpdateOrderStatus } from '@/query/orders.queries';
import SelleOrderSkeleton from '@/utils/skeleton/SellerOrdersSkeleton';

const SellerOrders: React.FC = () => {
  const { data: orders, error, isLoading, fetchNextPage, isFetchingNextPage , isFetchNextPageError} = useGetSellerOrders();  
  const { mutateAsync: updateOrderStatus } = useUpdateOrderStatus();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchNextPageError) {
      fetchNextPage()
    }
  }, [inView]);

  if (isLoading) {
    return <SelleOrderSkeleton />;
  }

  const handleStatusChange = async (id: string, newStatus: IOrderItem['status']) => {
    await updateOrderStatus({ orderId: id, status: newStatus });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col">
      <div className='flex items-center justify-between mb-6 flex-col sm:flex-row'>
        <h1 className="text-2xl md:text-3xl font-bold">All Orders</h1>
        <div className="flex gap-2 items-center mt-4 md:mt-0">
          <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">Sort By</label>
          <select name="sortby" id="sortby" className="p-2 text-sm md:text-base">
            <option value="Latest" className='p-2'>
              Latest
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="hidden md:table min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm md:text-base">Image</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Title</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Quantity</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Price</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Status</th>
              <th className="px-4 py-2 text-left text-sm md:text-base">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders?.pages.map((page: any[], pageIndex) => (
              <React.Fragment key={`page-${pageIndex}`}>
                {page.map((order: IOrderItem) => (
                  <tr key={order._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <img className='bg-cover rounded-full max-w-8 bg-center' src={order.imageUrl} alt="" />
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {order?.title?.toString().length > 15 ? `${order.title.toString().substr(0,15)}...` : order.title}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-2 text-sm md:text-base">₹{order.price}</td>
                    <td className="px-4 py-2">
                      <p className={`px-4 py-2 rounded-3xl font-semibold ${getStatusStyles(order.status)}`}>{order.status}</p>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        onChange={(e) => handleStatusChange(order._id, e.target.value as IOrderItem['status'])}
                        value={order.status}
                        className="bg-white hover:bg-gray-100 text-gray-700 py-1 px-2 rounded text-sm md:text-base"
                      >
                        <option value="processing">PROCESSING</option>
                        <option value="success">SUCCESS</option>
                        <option value="failed">FAILED</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="md:hidden space-y-4">
          {orders?.pages.map((page: any[], pageIndex) => (
            <React.Fragment key={`mobile-page-${pageIndex}`}>
              {page.map(order => (
                <div key={order._id} className="bg-white shadow-md rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={order.imageUrl} 
                        alt={order.title} 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg leading-tight">{order.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">Order #{order._id}</p>
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
                        onChange={(e) => handleStatusChange(order._id, e.target.value as IOrderItem['status'])}
                        value={order.status}
                        className="block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="processing">PROCESSING</option>
                        <option value="success">SUCCESS</option>
                        <option value="failed">FAILED</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div ref={ref} className="h-20 flex items-center justify-center">
            {/* Error message if fetching next page fails */}
            {error ? (
              <p className="text-gray-500 text-center">No More Orders Found</p>
            ) : isFetchingNextPage ? (
              <Spinner />
            ) : (
              <p className="text-gray-500 text-center">Scroll to load more orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
