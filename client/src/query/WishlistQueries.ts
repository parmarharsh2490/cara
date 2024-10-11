import { addToWishlist, getUserWishlist, removeFromWishlist } from "../services/WishlistServices"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"

export {
    useAddToWishlist,
    useGetUserWishlist,
    useRemoveFromWishlist
}

const useAddToWishlist = () => {
    return useMutation({
        mutationFn : (data : any) => addToWishlist(data),
        onSuccess : () => {
            alert("Successfully added to wishlist")
        }
    })
}
const useRemoveFromWishlist = () => {
    return useMutation({
        mutationFn : (data : any) => removeFromWishlist(data),
        onSuccess : () => {
            alert("Successfully remove from wishlist")
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
    });
};