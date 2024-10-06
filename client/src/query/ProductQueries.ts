import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, deleteProduct, getAllProducts, getLatestProducts, getProductDetails, getTopSelledProducts, updateProduct} from "../services/productService"


export {
    useGetLatestProducts,
    useCreateProduct,
    useUpdateProduct,
    useGetProductDetails,
    useDeleteProduct,
    useGetTopSelledProducts,
    useGetAllProducts
}

const useGetAllProducts = () => {
    return useMutation({
        mutationFn : (optinos : any) => getAllProducts(optinos),
        onSuccess : (data) => {
            console.log("Successfully received all products",data);
        }
})
}
const useGetLatestProducts = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.LATEST_PRODUCTS],
        queryFn : getLatestProducts,
        staleTime : 10000000,
        retryOnMount : false
})
}
const useGetTopSelledProducts = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.TOPSELLEDPRODUCTS],
        queryFn : getTopSelledProducts,
        staleTime : 10000000,
        retryOnMount : false
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
        mutationFn : (data : any) => updateProduct(data),
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
