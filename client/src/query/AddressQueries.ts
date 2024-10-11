import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { createUserAddress, deleteUserAddress, getUserAddress, updateUserAddress } from "../services/addressServices"

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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data : any) => updateUserAddress(data),
        onSuccess : () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ADDRESS] })
        }
    })
}
const useCreateUserAddress = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn : (data : any) => createUserAddress(data),
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