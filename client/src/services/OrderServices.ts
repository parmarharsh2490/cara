import apiClient from "."

export {
    getUserOrders,
    getSellerOrders,
    updateOrderStatus
}

const getUserOrders = async(skip : number) => {
    const response = await apiClient.get(`/order?skip=${skip}`);
    return response.data.data
}
const getSellerOrders = async(pageParam=0) => {
    console.log("In Service",pageParam);
    
    const response = await apiClient.get(`/order/seller?pageParam=${pageParam}`);
    return response.data.data
}
const updateOrderStatus = async(data : any) => {
    const response = await apiClient.patch("/order/update",data);
    return response.data.data
}