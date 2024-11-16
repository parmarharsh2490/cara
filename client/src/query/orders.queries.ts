import {
  createOrder,
  getSellerOrders,
  getUserOrders,
  paymentHandler,
  updateOrderStatus,
} from "../services/order.service";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useToast } from "@/hooks/use-toast";

export {
  useCreateOrder,
  usePaymentHandler,
  useGetUserOrders,
  useGetSellerOrders,
  useUpdateOrderStatus,
};

const useCreateOrder = () => {
  return useMutation({
    mutationFn: (totalCartAmount: number) => createOrder(totalCartAmount),
  });
};

const usePaymentHandler = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast()
  return useMutation({
    mutationFn: ({ paymentResponse, totalCartAmount }: any) =>
      paymentHandler({ paymentResponse, totalCartAmount }),
    onSuccess: () => {
      const queryKeysToInvalidate = [QUERY_KEYS.CART, QUERY_KEYS.ORDERS,QUERY_KEYS.DASHBOARD,QUERY_KEYS.ANALYTICS,QUERY_KEYS.PAYMENTWALLET,QUERY_KEYS.TOPSELLEDPRODUCTS];

      queryKeysToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      toast({
        title : "Success",
        description : "Successfully Placed Order",
        variant : "OrderStatusChange"
      })
    },
    onError : () => {
        toast({
            title : "Fail",
            description : "Failed to  Placed Order",
            variant : "destructive"
          })
    }
  });
};

const useGetUserOrders = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
    getUserOrders(pageParam),
    staleTime: Infinity,
    initialPageParam: 0,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
  });
};

const useGetSellerOrders = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.SELLERORDERS],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getSellerOrders(pageParam),
    staleTime: Infinity,
    initialPageParam: 0,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (_, allPages) => {
      return allPages.length;
    },
  });
};

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast()
  return useMutation({
    mutationFn: (data: any) => updateOrderStatus(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.SELLERORDERS] });
      const previousOrders = queryClient.getQueryData<any>([
        QUERY_KEYS.SELLERORDERS,
      ]);
      const newOrders = {
        ...previousOrders,
        pages: previousOrders.pages.map((page: any) =>
          page.map((order: any) =>
            order._id === data.orderId
              ? { ...order, status: data.status }
              : order
          )
        ),
      };

      queryClient.setQueryData([QUERY_KEYS.SELLERORDERS], newOrders);

      return { previousOrders };
    },
    onSuccess: () => {
      const queryKeysToInvalidate = [QUERY_KEYS.SELLERORDERS,QUERY_KEYS.DASHBOARD];
      queryKeysToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      toast({
        title : "Success",
        description : "Successfully Updated Order Status",
        variant : "OrderStatusChange"
      })
    },
  });
};
