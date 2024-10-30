import { addToWishlist, getUserWishlist, removeFromWishlist } from "../services/wishlist.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { IAddToWishlist } from "@/types"
import { useToast } from "@/hooks/use-toast"

export {
    useAddToWishlist,
    useGetUserWishlist,
    useRemoveFromWishlist
}

const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast()
    return useMutation({
        mutationFn : (data : IAddToWishlist) => addToWishlist(data),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.WISHLIST]}),
            toast({title : "Success",description : "Successfully Added to Wishlist",variant : "wishlist"})
        },
        onError : () => {
            toast({title : "Failed",description : "Failed To Add In Wishlist",variant : "destructive"})   
        }
    })
}
const useRemoveFromWishlist = () => {
    const {toast} = useToast()
    return useMutation({
        mutationFn : (wishlistId : any) => removeFromWishlist(wishlistId),
        onSuccess : () => {
            alert("Successfully remove from wishlist")
        },
        onError : () => {
            toast({title : "Failed",description : "Already in Wishlist",variant : "destructive"})   
        }
    })
}

const useGetUserWishlist = (skip: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.WISHLIST, skip],
      queryFn: () => getUserWishlist(skip),
      staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false
    });
};