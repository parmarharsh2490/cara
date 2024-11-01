import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { createUserAddress, deleteUserAddress, getUserAddress, updateUserAddress } from "../services/address.services"
import { IAddress } from "@/types"
import { useToast } from "@/hooks/use-toast"

export {
    useGetUserAddress,
    useCreateUserAddress,
    useUpdateUserAddress,
    useDeleteUserAddress
}

const useGetUserAddress = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.ADDRESS],
        queryFn : getUserAddress,
        retry : false,
        refetchInterval : false,
        retryOnMount : false,
        refetchOnWindowFocus : false,
    })
}

const useUpdateUserAddress = () => {
    const queryClient = useQueryClient();
    const {toast} = useToast();
    return useMutation({
        mutationFn : (data : IAddress) => updateUserAddress(data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS] });
            toast({
                title: "Success",
                description: "Successfully Updated Address",
                variant: "cart",
            });
        },
        onError : () => {
            toast({
                title: "Failed",
                description: "Failed To Update Address.Please Fill All Details",
                variant: "destructive",
            });
        }
    })
}
const useCreateUserAddress = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data : IAddress) => createUserAddress(data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS] })
        }
    })
}
const useDeleteUserAddress = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : deleteUserAddress,
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS] })
        }
    })
}