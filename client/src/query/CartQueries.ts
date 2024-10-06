import { addToCart, getUserCart, removeFromCart, updateQuantity } from "../services/cartServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { ICartItems } from "@/types"

export {
    useAddToCart,
    useGetUserCart,
    useUpdateQuantity,
    useRemoveFromCart
}

const useGetUserCart = () => {
    return useQuery({
        queryFn : getUserCart,
        queryKey : [QUERY_KEYS.CART],
        staleTime : Infinity,
        retryOnMount : false,
        refetchOnMount : false,
        retry : false
    })
}


const useUpdateQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateQuantity(data),
        onMutate: async (data : {quantity : number,cartProductId : string}) => {
            const previousCart = queryClient.getQueryData([QUERY_KEYS.CART]);
            console.log(previousCart);
            queryClient.setQueryData([QUERY_KEYS.CART],(products : ICartItems[]) => {
                products.map((product) => {
                    product.quantity = data.quantity;
                    return product
                })
            })
            return { previousCart };
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.CART]})
        }
    });
};

const useRemoveFromCart = () => {
    return useMutation({
        mutationFn : (data) => removeFromCart(data),
        onSuccess : () => {
            alert("Successfully Added to Cart")
        }
    })
}

const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data : any) => addToCart(data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey : [QUERY_KEYS.CART]})
        }
    })
}

