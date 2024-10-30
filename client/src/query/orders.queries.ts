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
  useQuery,
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
      const queryKeysToInvalidate = [QUERY_KEYS.CART, QUERY_KEYS.ORDERS];

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

const useGetUserOrders = (skip: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, skip],
    queryFn: () => getUserOrders(skip),
    staleTime: Infinity,
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERORDERS] });
      toast({
        title : "Success",
        description : "Successfully Updated Order Status",
        variant : "OrderStatusChange"
      })
    },
  });
};
