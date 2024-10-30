import { IProductReview } from "@/types"
import { createProductReview, deleteProductReview, getProductReview, updateProductReview } from "../services/productReview.service"
import { QUERY_KEYS } from "./queryKeys"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

export {
    useGetProductReview,
    useCreateProductReview,
    useUpdateProductReview,
    useDeleteProductReview
}

const useGetProductReview = (productId : string) => {
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.PRODUCTREVIEW, productId],
      queryFn: ({ pageParam = 0 }) => getProductReview({ productId, pageParam }),
      initialPageParam: 0,
      enabled: !!productId,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (_, __, lastPage) => lastPage + 1,
    });
}

const useCreateProductReview = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast()
    return useMutation({
      mutationFn : ({ data, productId }: { data: IProductReview, productId: any }) => createProductReview(data, productId),
      onSuccess : (data) => {
        if (data) {
          queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,data.product]});
        };
        toast({
          title: 'Success',
          description: 'Successfully Added Product Review',
          variant: 'productReview'
        });
      },
      onError : () => {
        toast({
          title: 'Failed',
          description: `Failed to  Create Product Review`,
          variant: 'destructive'
        });
      }
    })
  }
const useUpdateProductReview = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast()
  return useMutation({
    mutationFn : ({data,productId}: { data: IProductReview, productId: any }) => updateProductReview({data,productId}),
    onSuccess : (data) => {
      if (data) {
        queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,data.product]});
      }
      toast({
        title: 'Success',
        description: 'Successfully Updated Product Review',
        variant: 'productReview'
      });
    },
    onError : () => {
      toast({
        title: 'Failed',
        description: `Failed to  Update Product Review`,
        variant: 'destructive'
      });
    }
  })
  }
const useDeleteProductReview = (productId : any) => {
  const queryClient = useQueryClient();
  const {toast} = useToast()
  return useMutation({
    mutationFn : (reviewId) => deleteProductReview(reviewId),
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey : [QUERY_KEYS.PRODUCTREVIEW,productId]}),
      toast({
        title: 'Success',
        description: 'Successfully Deleted Product Review',
        variant: 'productReview'
      });
    },
    onError : () => {
      toast({
        title: 'Failed',
        description: 'Failed To Delete Product Review',
        variant: 'destructive'
      });
    }
  })
  }