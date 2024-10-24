import { createOrder, paymentHandler } from "../services/order.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"

export {
    useCreateOrder,
    usePaymentHandler
}

const useCreateOrder = () => {
    return useMutation({
        mutationFn : (totalCartAmount : number) =>createOrder(totalCartAmount)
    })
}
const usePaymentHandler = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({paymentResponse,totalCartAmount} : any) =>paymentHandler({paymentResponse,totalCartAmount}),
        onSuccess : () => {
            const queryKeysToInvalidate = [QUERY_KEYS.CART, QUERY_KEYS.ORDERS];

  queryKeysToInvalidate.forEach(queryKey => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  });
        }
    })
}