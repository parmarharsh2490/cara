import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { getPaymentWalletDetails, withdrawAmount } from "@/services/paymentWallet.service"
import { useToast } from "@/hooks/use-toast"

export {
    useGetPaymentWalletDetails,
    useWithdrawAmount
}

const useGetPaymentWalletDetails = () => {
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.PAYMENTWALLET],
        queryFn : ({pageParam = 0} : {pageParam : number}) =>getPaymentWalletDetails(pageParam),
        initialPageParam : 0,
        retry : false,
        getNextPageParam: (_, allPages) => {
            return (allPages.length)
        }
    })
}

const useWithdrawAmount = () => {
    const {toast} = useToast()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : withdrawAmount,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PAYMENTWALLET]})
            toast({
                title : "Success", 
                description: "Withdraw successful!", 
                variant: "cart" 
              });
        },
        onError : () => {
            toast({
                title : "Failed", 
                description: "Withdraw Failed!", 
                variant: "destructive" 
              });
        }
    })
}