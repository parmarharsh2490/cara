import { addToWishlist, getUserWishlist, removeFromWishlist } from "../services/WishlistServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"

export {
    useAddToWishlist,
    useGetUserWishlist,
    useRemoveFromWishlist
}

const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data : any) => addToWishlist(data),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.WISHLIST]})
        }
    })
}
const useRemoveFromWishlist = () => {
    return useMutation({
        mutationFn : (wishlistId : any) => removeFromWishlist(wishlistId),
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
      refetchOnWindowFocus : false
    });
};