import {createUserAccount, getUserDetails, loginUserAccount, updateUserDetails} from "../services/user.service"
import { becomeSeller, getSellerDetails, updateSellerDetails } from "../services/seller.service"
import { ILoginUser, INewUser, ISeller, IUser } from "../types/index"
import {   useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { useToast } from "@/hooks/use-toast"

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
    return useMutation({
        mutationFn : (user : INewUser) => createUserAccount(user)
    })
}

const useLoginUserAccount = () => {
    const {toast} = useToast()
    return useMutation({
        mutationFn : (user : ILoginUser) => loginUserAccount(user),
        onSuccess : () => {
            toast({
                title: "Success",
                description: "Successfully Logged In",
              });
        },
        onError : () => {
            toast({
                title: "Failed",
                description: "Login Error,Please Try Again",
              })
        }
    })
}

const useGetUserDetails = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.USER],
        queryFn : getUserDetails,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry : false
    })
}

const useUpdateUserDetails = () => {
    const {toast} = useToast()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn  : (data : IUser) => updateUserDetails(data),
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : [QUERY_KEYS.USER]})
            toast({
                title : "Success",
                description : "Successfully Updated User Details",
                variant : "cart"
            })
        }
    })
}

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
      mutationFn: (sellerData : ISeller) => updateSellerDetails(sellerData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERDETAILS] });
      },
    });
};
  