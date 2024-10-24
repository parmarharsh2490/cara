import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { getSellerOrders, getUserOrders, updateOrderStatus } from "../services/OrderServices"

export {
    useGetUserOrders,
    useGetSellerOrders,
    useUpdateOrderStatus
}

const useGetUserOrders = (skip : number) => {
    return useQuery({
        queryKey : [QUERY_KEYS.ORDERS,skip],
        queryFn : () => getUserOrders(skip),
        staleTime : Infinity,
    })
}

const useGetSellerOrders = () => {
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.SELLERORDERS],
        queryFn : ({ pageParam = 0 } : {pageParam : number}) => getSellerOrders(pageParam),
        staleTime : Infinity,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) { // Assuming the API returns a flag to indicate more pages exist
                return allPages.length; // Use the length of allPages to get the next page index
            } else {
                return undefined; // If no more pages, return undefined
            }
        }
        
    })
}

const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: any) => updateOrderStatus(data), // Your function to update order status
        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.SELLERORDERS, data.skip] });

            const previousOrders = queryClient.getQueryData<any>([QUERY_KEYS.SELLERORDERS, data.skip]);
            // console.log(previousOrders);
            
            const newOrders = previousOrders.map((order : any) => {
                if (order._id === data.orderId) {
                    return { ...order, status: data.status }; // Return a new object with updated status
                }
                return order;
            });
            // console.log(newOrders);
            // console.log(QUERY_KEYS.SELLERORDERS);
            // console.log(data.skip);
            
            queryClient.setQueryData([QUERY_KEYS.SELLERORDERS, data.skip], newOrders);

            return { previousOrders };
        },
        // onError: (data, context) => {
        //     queryClient.setQueryData([QUERY_KEYS.SELLERORDERS, data?.skip], context.previousOrders);
        // },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERORDERS, data.skip] });
            console.log("Order status updated successfully", data);
        },
    });
};
