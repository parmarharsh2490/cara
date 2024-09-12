import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, deleteProduct, getLatestProducts, getProductDetails, updateProduct} from "../services/productService.ts"
import {createUserAccount, loginUserAccount} from "../services/userServices.ts"
export {
    useGetLatestProducts,
    useCreateProduct,
    useUpdateProduct,
    useGetProductDetails,
    useDeleteProduct,
    useCreateUserAccount,
    useLoginUserAccount
}

/// auth queries
const useCreateUserAccount = () => {
    console.log("here in queries");
    
    return useMutation({
        mutationFn : (user) => createUserAccount(user)
    })
}
const useLoginUserAccount = () => {
    return useMutation({
        mutationFn : (user) => loginUserAccount(user)
    })
}


// product queries
const useGetLatestProducts = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.LATEST_PRODUCTS],
        queryFn : getLatestProducts
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
          
            queryClient.invalidateQueries([QUERY_KEYS.PRODUCT,data._id]);
        }
    })
}
const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (data : any) => deleteProduct(data),
        onSuccess : (data) => {
          
            queryClient.invalidateQueries([QUERY_KEYS.PRODUCT,data._id]);
        }
    })
}
const useGetProductDetails = (data : string) => {
    console.log("start");
    return useQuery({
        queryKey : [QUERY_KEYS.PRODUCT,data],
        queryFn : () => getProductDetails(data)
    })
}