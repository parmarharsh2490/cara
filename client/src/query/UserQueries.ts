import {createUserAccount, getUserDetails, loginUserAccount, updateUserDetails} from "../services/userServices"
import { becomeSeller, getSellerDetails, updateSellerDetails } from "../services/adminServices"
import { ILoginUser, INewUser } from "../types/index"
import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"

export {
    useCreateUserAccount,
    useLoginUserAccount,
    useGetUserDetails,
    useGetSellerDetails,
    useUpdateSellerDetails,
    useUpdateUserDetails,
    useBecomeSeller
}
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

const useGetUserDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.USER],
        queryFn : getUserDetails,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
    })
}

const useUpdateUserDetails = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn  : (data : any) => updateUserDetails(data),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.USER]})
        }
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
  