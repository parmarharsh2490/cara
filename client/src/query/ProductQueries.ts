import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, deleteProduct, getAdminProducts, getAllProducts, getLatestProducts, getProductDetails, getTopSelledProducts, updateProduct} from "../services/productService"


export {
    useGetLatestProducts,
    useCreateProduct,
    useUpdateProduct,
    useGetProductDetails,
    useDeleteProduct,
    useGetTopSelledProducts,
    useGetAllProducts,
    useGetAdminProducts
}

const useGetAdminProducts = (skip : number) => {
    return useQuery({
        queryKey : [QUERY_KEYS.ADMINPRODUCTS,skip],
        queryFn : () => getAdminProducts(skip),
})
}
const useGetAllProducts = (options : any) => {
    console.log(options);
    
    return useQuery({
        queryKey : [QUERY_KEYS.PRODUCTS,{...options}],
        enabled: options.enabled,
        queryFn : () => getAllProducts(options),
        retry : false,
        retryOnMount : false,
        refetchOnWindowFocus : false
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
        queryKey : [QUERY_KEYS.TOPSELLEDPRODUCTS],
        queryFn : () =>getTopSelledProducts(skip),
        staleTime: Infinity,
      retryOnMount: false,
      refetchOnMount: false,
      retry: false,
      placeholderData : true,
      refetchOnWindowFocus : false
})
}

const useCreateProduct = () => {
    return useMutation({
        mutationFn : (data : any) => createProduct(data)
    })
}

const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({ data, productId }: { data: any, productId: any }) => updateProduct({data, productId}),
        onSuccess : (data) => {
            queryClient.invalidateQueries( { queryKey : [QUERY_KEYS.PRODUCT,data?.data?._id]});
        }
    })
}

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data : any) => deleteProduct(data),
        onSuccess : (data) => {        
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, data.data._id] });
        }
    })
}

const useGetProductDetails = (data : string) => {
    console.log("start");
    return useQuery({
        queryKey : [QUERY_KEYS.PRODUCT,data],
        queryFn : () => getProductDetails(data),
        staleTime : 1000000
    })
}
