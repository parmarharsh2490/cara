import { createProductReview, deleteProductReview, getProductReview, updateProductReview } from "../services/productReview.services"
import { QUERY_KEYS } from "./queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export {
    useGetProductReview,
    useCreateProductReview,
    useUpdateProductReview,
    useDeleteProductReview
}

const useGetProductReview = ({productId,pageParam} : {productId : string,pageParam : number}) => {
  console.warn(pageParam);
  
    return useQuery({
      queryKey : [QUERY_KEYS.PRODUCTREVIEW,productId],
      queryFn : () => getProductReview({productId,pageParam}),
      staleTime : Infinity,
      retry : false,
      refetchOnMount : false,
      refetchOnWindowFocus : false,
      placeholderData : true
    })
}

const useCreateProductReview = () => {
  const queryClient = useQueryClient();
    return useMutation({
      mutationFn : ({ data, productId }: { data: any, productId: any }) => createProductReview(data, productId),
      onSuccess : (data) => {
        if (data) {
          queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,data.product]});
        }
      }
    })
  }
const useUpdateProductReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : ({data,productId}: { data: any, productId: any }) => updateProductReview({data,productId}),
    onSuccess : (data) => {
      console.log(data);
      
      if (data) {
        queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,data.product]});
      }
    }
  })
  }
const useDeleteProductReview = (productId : any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : (reviewId) => deleteProductReview(reviewId),
    onSuccess : () => {
      console.log(productId);
      queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,productId]})
    }
  })
  }