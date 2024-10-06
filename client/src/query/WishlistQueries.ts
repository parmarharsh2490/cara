import { addToWishlist, getUserWishlist } from "../services/WishlistServices"
import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"

export {
    useAddToWishlist,
    useGetUserWishlist
}

const useAddToWishlist = () => {
    return useMutation({
        mutationFn : (data : any) => addToWishlist(data),
        onSuccess : () => {
            alert("Successfully added to wishlist")
        }
    })
}
const useGetUserWishlist = () => {
    return useQuery({
        queryFn : getUserWishlist,
        queryKey : [QUERY_KEYS.WISHLIST],
        staleTime : Infinity,
        retryOnMount : false,
        refetchOnMount : false,
        retry : false
    })
}