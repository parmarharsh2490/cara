import { useEffect, useState, useCallback } from 'react';
import { useGetUserOrders } from '../../query/orderQueries';

const Orders = () => {
  const [skip, setSkip] = useState(0); 
  const [orders, setOrders] = useState<any[]>([]);
  const { data: newOrders, isLoading, isFetching } = useGetUserOrders(skip);
  useEffect(() => {
    if (newOrders?.length > 0) {
      setOrders((prevOrders) => {
        return [...prevOrders, ...newOrders]; 
      });
    }
  }, [newOrders]); 

  const loadMoreOrders = useCallback(() => {
    setSkip((prevSkip) => prevSkip + 5);
  }, []);

  if (isLoading && orders.length === 0) {
    return  <div className='p-5 sm:p-10 w-full'>
    <div className='w-32 h-5 my-10 bg-slate-200 animate-pulse rounded-lg'></div>
    <div className='sm:h-36 w-full flex'>
      <div className='w-[20%] h-20 sm:h-full  bg-slate-200 animate-pulse'></div>
      <div className='h-full w-[80%] '>
        <div className="upper w-full flex px-3 justify-between items-start flex-col sm:flex-row h-[80%] ">
          <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
            <h2 className='text-sm h-5 w-48 bg-slate-200 animate-pulse rounded-lg'></h2>
            <h3 className='text-sm h-5 w-56 bg-slate-200 animate-pulse rounded-lg my-3'></h3>
            <div className='flex justify-start gap-1 items-center mt-2 h-5 w-40 bg-slate-200 animate-pulse rounded-lg'>
            </div>
          </div>
          <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-2 sm:flex-col sm:w-[20%]">
            <h1 className='font-semibold text-sm sm:text-xl my-2 sm:my-0 h-5 w-20 bg-slate-200 animate-pulse rounded-lg'></h1>
            <h3 className='inilne-block text-sm sm:text-md font-semibold h-5 w-20 bg-slate-200 animate-pulse rounded-lg '></h3>
          </div>
        </div>
      </div>
    </div>
    <div className='sm:h-36 w-full my-10 sm:my-5 flex'>
      <div className='w-[20%] h-20 sm:h-full  bg-slate-200 animate-pulse'></div>
      <div className='h-full w-[80%] '>
        <div className="upper w-full flex px-3 justify-between items-start flex-col sm:flex-row h-[80%] ">
          <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
            <h2 className='text-sm h-5 w-48 bg-slate-200 animate-pulse rounded-lg'></h2>
            <h3 className='text-sm h-5 w-56 bg-slate-200 animate-pulse rounded-lg my-3'></h3>
            <div className='flex justify-start gap-1 items-center mt-2 h-5 w-40 bg-slate-200 animate-pulse rounded-lg'>
            </div>
          </div>
          <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-2 sm:flex-col sm:w-[20%]">
            <h1 className='font-semibold text-sm sm:text-xl my-2 sm:my-0 h-5 w-20 bg-slate-200 animate-pulse rounded-lg'></h1>
            <h3 className='inilne-block text-sm sm:text-md font-semibold h-5 w-20 bg-slate-200 animate-pulse rounded-lg '></h3>
          </div>
        </div>
      </div>
    </div>

  </div>
  }

  if (!isLoading && orders.length === 0) {
    return <p>No Orders Found...</p>;
  }

  return (
    <div className='flex flex-col w-full'>
      <h1 className='text-2xl xl:p-3'>Your Orders</h1>

      <div className='overflow-scroll max-h-[525px]'>
        {orders.map((product: any, index: number) => (
          <div
            key={product._id + index}
            className="w-full flex justify-center bg-blue-50 items-center sm:items-center h-auto sm:h-40 p-1 rounded-sm my-3 border"
          >
            <img
              className="h-full sm:w-[20%] w-[100%] max-w-[200px] border rounded-sm object-cover bg-cover"
              src={product.imageUrl}
              alt={product.title}
            />
            <div className="h-full w-[80%] sm:p-2">
              <div className="w-full flex p-1 justify-between items-start flex-col sm:flex-row">
                <div className="left w-full sm:w-[80%] flex flex-col items-start pl-1">
                  <h2 className="text-lg whitespace-nowrap md:text-base lg:text-xl">{product.title}</h2>
                  <h3 className="text-xs md:text-base">
                    Color{' '}
                    <div
                      style={{ backgroundColor: product.color }}
                      className="inline-block border rounded-sm h-3 w-3 mx-1 mt-[4px]"
                    ></div>{' '}
                    Size · {product.size} · SKU 04-955630-small
                  </h3>
                  <div>
                    <p className="mt-1 text-[12px] md:text-[15px]">
                      <span className="font-semibold">Quantity: </span> {product.quantity}
                    </p>
                    <p className="mt-1 text-[12px] md:text-[15px]">
                      <span className="font-semibold">Order Date: </span> {product.orderDate}
                    </p>
                    <p className="mt-1 text-[12px] md:text-[15px]">
                      <span className="font-semibold">Payment ID :</span> {product.paymentId}
                    </p>
                  </div>
                </div>
                <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-0 sm:flex-col sm:w-[20%]">
                  <h1 className="font-semibold text-sm md:text-xl my-1 sm:my-0">₹{product.price}</h1>
                  <h3 className="inline-block text-sm md:text-md font-semibold text-green-600">(15% off)</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center mt-4'>
        
          <button className='md:p-3 p-2 bg-gray-500 max-w-48 border rounded-2xl' onClick={loadMoreOrders}>
          {isFetching ?  "Loading more orders..." : "Load More"}
          </button>
      </div>
    </div>
  );
};

export default Orders;
