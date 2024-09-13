import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, deleteProduct, getLatestProducts, getProductDetails, updateProduct} from "../services/productService.ts"
import {createUserAccount, getUserDetails, loginUserAccount, updateUserDetails} from "../services/userServices.ts"
import { becomeSeller, getSellerDetails, updateSellerDetails } from "../services/adminServices.ts"
import { ILoginUser, INewUser } from "@/types/index.ts"

/// auth queries
const useCreateUserAccount = () => {
    console.log("here in queries");
    
    return useMutation({
        mutationFn : (user : INewUser) => createUserAccount(user)
    })
}
const useLoginUserAccount = () => {
    return useMutation({
        mutationFn : (user : ILoginUser) => loginUserAccount(user)
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
        queryFn : () => getProductDetails(data)
    })
}

const useGetUserDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.USER],
        queryFn : getUserDetails,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
    })
}


// admin queries

const useBecomeSeller = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : becomeSeller,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.USER]})
        }
    })
}

const useGetSellerDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.SELLERDETAILS],
        queryFn : getSellerDetails,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 300000,  // 5 minutes
    })
}

const useUpdateSellerDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (sellerData) => updateSellerDetails(sellerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERDETAILS] });
      },
    });
};
  
// user queries
const useUpdateUserDetails = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn  : (data : any) => updateUserDetails(data),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.USER]})
        }
    })
}


export {
    useGetLatestProducts,
    useCreateProduct,
    useUpdateProduct,
    useGetProductDetails,
    useDeleteProduct,
    useCreateUserAccount,
    useLoginUserAccount,
    useGetUserDetails,
    useGetSellerDetails,
    useUpdateSellerDetails,
    useUpdateUserDetails,
    useBecomeSeller
}