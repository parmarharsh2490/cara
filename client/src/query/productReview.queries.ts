import { createProductReview, deleteProductReview, getProductReview, updateProductReview } from "../services/productReview.services"
import { QUERY_KEYS } from "./queryKeys"
import { useMutation, useQuery } from "@tanstack/react-query"

export {
    useGetProductReview,
    useCreateProductReview,
    useUpdateProductReview,
    useDeleteProductReview
}

const useGetProductReview = (productId : string,skip : number) => {
    return useQuery({
      queryKey : [QUERY_KEYS.PRODUCTREVIEW,productId,skip],
      queryFn : () => getProductReview(productId,skip),
      staleTime : Infinity,
      retry : false,
      refetchOnMount : false,
      refetchOnWindowFocus : false,
      placeholderData : true
    })
}

const useCreateProductReview = () => {
    return useMutation({
      mutationFn : ({ data, productId }: { data: any, productId: any }) => createProductReview(data, productId),
    })
  }
const useUpdateProductReview = () => {
  return useMutation({
    mutationFn : (data) => updateProductReview(data),
  })
  }
const useDeleteProductReview = () => {
  return useMutation({
    mutationFn : (data :any) => deleteProductReview(data),
  })
  }