import OrdersSkeleton from "@/utils/skeleton/OrdersSkeleton";
import { useGetUserOrders } from "../../query/orders.queries";
import { useCallback } from "react";
import { IOrderProduct } from "@/types";
import { allItems } from "@/utils/alItems";
import Meta from "@/utils/Meta";

const Orders = () => {
  const { data: orders, isLoading, isFetching,error,fetchNextPage } = useGetUserOrders();

  const loadMoreOrders = useCallback(() => {
    fetchNextPage()
  }, []);

  if (isLoading) {
    return (
      <>
      <Meta
      title="Your Orders - Sara-Ecommerce"
      description="View and manage your orders on Sara-Ecommerce. Check order details, track shipments, and review your purchase history for a seamless shopping experience."
      keywords="Orders, Sara-Ecommerce, Order Management, Purchase History, Track Orders"
      />
    <OrdersSkeleton />
      </>
    );
  }

  if (error && allItems(orders).length===0) {
    return (
      <>
      <Meta
      title="Your Orders - Sara-Ecommerce"
      description="View and manage your orders on Sara-Ecommerce. Check order details, track shipments, and review your purchase history for a seamless shopping experience."
      keywords="Orders, Sara-Ecommerce, Order Management, Purchase History, Track Orders"
      />
      <div className="h-full w-full flex-col flex justify-center items-center">
        <img
          src="https://img.freepik.com/free-vector/taking-orders-by-phone-store-contact-center-customers-support-easy-order-fast-delivery-trade-service-call-center-operator-cartoon-character_335657-2564.jpg?w=740&amp;t=st=1704033823~exp=1704034423~hmac=f7c5bd79abebef12636749bebefc11c58384b1e19cd35d7875fd9bf1bbaeb720"
          className="h-80 w-80 mt-6"
          alt=""
        />
        <h3 className="-mt-5 text-xl text-slate-500">No orders found !!</h3>
      </div>
      </>
    );
  }

  return (
    <>
    <Meta
      title="Your Orders - Sara-Ecommerce"
      description="View and manage your orders on Sara-Ecommerce. Check order details, track shipments, and review your purchase history for a seamless shopping experience."
      keywords="Orders, Sara-Ecommerce, Order Management, Purchase History, Track Orders"
      />
    <div className="flex flex-col w-full">
      <h1 className="text-2xl xl:p-3">Your Orders</h1>

      <div className="overflow-scroll max-h-[525px]">
      {allItems(orders).map((product: IOrderProduct, index: number) => (
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
            <h2 className="text-lg whitespace-nowrap md:text-base lg:text-xl">
            {product.title}
            </h2>
            <h3 className="text-xs md:text-base">
            Color{" "}
            <div
              style={{ backgroundColor: product.color }}
              className="inline-block border rounded-sm h-3 w-3 mx-1 mt-[4px]"
            ></div>{" "}
            Size · {product.size} · SKU 04-955630-small
            </h3>
            <div>
            <p className="mt-1 text-[12px] md:text-[15px]">
              <span className="font-semibold">Quantity: </span>{" "}
              {product.quantity}
            </p>
            <p className="mt-1 text-[12px] md:text-[15px]">
              <span className="font-semibold">Order Date: </span>{" "}
              {product.createdAt.substr(0,10)}
            </p>
            <p className="mt-1 text-[12px] md:text-[15px]">
              <span className="font-semibold">Payment ID :</span>{" "}
              {product.paymentId}
            </p>
            </div>
          </div>
          <div className="right w-full flex flex-row justify-start items-center gap-3 sm:gap-0 sm:flex-col sm:w-[20%]">
            <h1 className="font-semibold text-sm md:text-xl my-1 sm:my-0">
            ₹{product.price}
            </h1>
            <h3 className="inline-block text-sm md:text-md font-semibold text-green-600">
            (15% off)
            </h3>
          </div>
          </div>
        </div>
        </div>
      ))}
      </div>

      <div className="flex items-center justify-center mt-4">
      <button
      className="py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 my-5"
        disabled={error || isFetching ? true : false}
        onClick={loadMoreOrders}
        aria-label="Load More Orders"
      >
        {isFetching ? "Loading more orders..." : error ? "No More Orders Found" :  "Load More"}
      </button>
      </div>
    </div>
    </>
  );
};

export default Orders;
