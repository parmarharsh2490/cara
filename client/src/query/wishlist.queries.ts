import { addToWishlist, getUserWishlist, getUserWishlistCount, removeFromWishlist } from "../services/wishlist.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { IAddToWishlist, IWishlistProduct } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { useContext } from "react"
import { UserContext } from "@/context"

export {
    useAddToWishlist,
    useGetUserWishlist,
    useRemoveFromWishlist,
    useGetUserWishlistCount
}

const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast()
    return useMutation({
        mutationFn : (data : IAddToWishlist) => addToWishlist(data),
        onSuccess : (data : IWishlistProduct[]) => {
            for (let skip = 0; skip <= data.length; skip += 4) {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISHLIST, skip] });
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISHLISTCOUNT] });
            toast({title : "Success",description : "Successfully Added to Wishlist",variant : "wishlist"})
        },
        onError : () => {
            toast({title : "Failed",description : "Failed To Add In Wishlist",variant : "destructive"})   
        }
    })
}

const useRemoveFromWishlist = () => {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (wishlistId : any) => removeFromWishlist(wishlistId),
        onSuccess : (data) => {
            for (let skip = 0; skip <= data.length; skip += 4) {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISHLIST, skip] });
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WISHLISTCOUNT] });
            toast({title : "Success",description : "Successfully Removed From Wishlist",variant : "wishlist"});
        },
        onError : () => {
            toast({title : "Failed",description : "Failed To Remove From Wishlist",variant : "destructive"})   
        }
    })
}

const useGetUserWishlist = (skip: number) => {
    const {isAuthenticated} = useContext(UserContext);
    return useQuery({
      queryKey: [QUERY_KEYS.WISHLIST, skip],
      queryFn: () => getUserWishlist(skip),
      staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false,
      enabled : isAuthenticated
    });
};
const useGetUserWishlistCount = () => {
    const {user} = useContext(UserContext);
    return useQuery({
      queryKey: [QUERY_KEYS.WISHLISTCOUNT],
      queryFn: () => getUserWishlistCount(),
      staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false,
      enabled : !!user.email
    });
};