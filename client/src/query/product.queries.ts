import {   useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, deleteProduct,getSellerProducts, getAllProducts, getLatestProducts, getProductDetails, getTopSelledProducts, updateProduct} from "../services/product.service"
import { useToast } from "@/hooks/use-toast"


export {
    useGetLatestProducts,
    useCreateProduct,
    useUpdateProduct,
    useGetProductDetails,
    useDeleteProduct,
    useGetTopSelledProducts,
    useGetAllProducts,
    useGetSellerProducts
}

const useGetSellerProducts = () => {
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.ADMINPRODUCTS],
        queryFn : ({ pageParam = 0 } : {pageParam : number}) => getSellerProducts(pageParam),
        staleTime : Infinity,
        initialPageParam: 0,
        retry : false,
        refetchOnWindowFocus : false,
        getNextPageParam: (_, allPages) => {
            return (allPages.length)
        }
        
    })
}

const useGetAllProducts = (options : any) => {
    return useInfiniteQuery({
        queryKey : [QUERY_KEYS.PRODUCTS,options],
        queryFn : ({ pageParam = 0 }) => getAllProducts({ ...options, pageParam }),
        initialPageParam : 0,
        getNextPageParam : (_,allPages) => {
          const nextPage = allPages.length || 1;
          return nextPage;
        }
      })
}

const useGetLatestProducts = (pageParam : number) => {
    return useQuery({
        queryKey : [QUERY_KEYS.LATEST_PRODUCTS,pageParam],
        queryFn : () => getLatestProducts(pageParam),
        staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false
})
}
const useGetTopSelledProducts = (skip : number) => {
    return useQuery({
        queryKey : [QUERY_KEYS.TOPSELLEDPRODUCTS,skip],
        queryFn : () => getTopSelledProducts(skip),
        staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false
})
}

const useCreateProduct = () => {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data : any) => createProduct(data),
        onSuccess : () => {
            const queryKeysToInvalidate = [QUERY_KEYS.LATEST_PRODUCTS,QUERY_KEYS.ADMINPRODUCTS,QUERY_KEYS.PRODUCTS];

      queryKeysToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
            toast({
                title: "Success",
                description: "Successfully created Product"
              });
        },
        onError : () => {
            toast({
                title: "Failed",
                description: "Failed creating Product",
                variant: "destructive"
              });
        }
    })
}

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast()
    return useMutation({
        mutationFn : ({ data, productId }: { data: any, productId: any }) => updateProduct({data, productId}),
        onSuccess : (data) => {
            queryClient.invalidateQueries( { queryKey : [QUERY_KEYS.PRODUCT,data?.data?._id]});
            toast({
                title: "Success",
                description: "Successfully updated Product"
              });
        },
        onError : () => {
            toast({
                title: "Failed",
                description: "Failed updating Product",
                variant: "destructive"
              });
        }
    })
}

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast()
    return useMutation({
        mutationFn : (productId : any) => deleteProduct(productId),
        onSuccess : (data) => {        
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, data.data._id] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADMINPRODUCTS] });
            toast({
                title : "Success",
                description : "Success To Delete Product",
                variant : "cart"
              })
        },
        onError : () => {
            toast({
                title : "Failed",
                description : "Failed To Delete Product",
                variant : "destructive"
              })
        }
    })
}

const useGetProductDetails = (data : string) => {
    return useQuery({
        queryKey : [QUERY_KEYS.PRODUCT,data],
        queryFn : () => getProductDetails(data),
        staleTime : 1000000
    })
}
