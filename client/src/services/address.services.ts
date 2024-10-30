import { IAddress } from "@/types";
import apiClient from "."

export {
    getUserAddress,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress
}

const getUserAddress = async() => {
    const response =  await apiClient.get('/address');
    return response.data.data
}
const createUserAddress = async(data : IAddress) => {
    const response =  await apiClient.post('/address/create',data);
    return response.data.data
}
const updateUserAddress = async(data : IAddress) => {
    const response =  await apiClient.patch('/address/update',data);
    return response.data.data
}
const deleteUserAddress = async() => {
    const response =  await apiClient.delete('/address/delete');
    return response.data.data
}