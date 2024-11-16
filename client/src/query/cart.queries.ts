import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateQuantity,
} from "../services/cart.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { IAddToCart, ICartItems, IUpdateCartQuantity } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";
import { UserContext } from "@/context";

export { useAddToCart, useGetUserCart, useUpdateQuantity, useRemoveFromCart };

const useGetUserCart = () => {
  const {user} = useContext(UserContext);
  return useQuery({
    queryFn: getUserCart,
    queryKey: [QUERY_KEYS.CART],
    staleTime: Infinity,
    retryOnMount: false,
    refetchOnMount: false,
    retry: false,
    enabled : !!user?.email
  });
};

const useUpdateQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateCartQuantity) => updateQuantity(data),
    onMutate: async (data: { quantity: number; cartProductId: string }) => {
      const previousCart = queryClient.getQueryData([QUERY_KEYS.CART]);
      queryClient.setQueryData([QUERY_KEYS.CART], (products: ICartItems[]) => {
        products.map((product) => {
          if (product._id === data.cartProductId) {
            product.quantity = data.quantity;
          }
          return product;
        });
      });
      return { previousCart };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
    },
  });
};

const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (cartProductId: string) => removeFromCart(cartProductId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] }),
        toast({
          title: "Success",
          description: "Successfully Removed From Cart",
          variant: "cart",
        });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] }),
        toast({
          title: "Failed",
          description: "Failed to Remove From Cart",
          variant: "destructive",
        });
    },
  });
};

const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (data: IAddToCart) => addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      toast({
        title: "Success",
        description: "Successfully Added to Cart",
        variant: "cart",
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      toast({
        title: "Failed",
        description: "Failed to Add to Cart",
        variant: "destructive",
      });
    },
  });
};
