import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

const useGetSellerOrders = (skip : number) => {
    return useQuery({
        queryKey : [QUERY_KEYS.ORDERS,skip],
        queryFn : () => getSellerOrders(skip),
        staleTime : Infinity,
    })
}

const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data : any) =>updateOrderStatus(data),
        onSuccess : () => {
            alert("Success");
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.ORDERS]})
        }
    })
}