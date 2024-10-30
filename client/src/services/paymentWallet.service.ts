import apiClient from "."

export {
    getPaymentWalletDetails,
    withdrawAmount
}

const getPaymentWalletDetails = async(pageParam : number) => {
    const response = await apiClient.get('/paymentwallet',{
        params : {
            pageParam
        }
    });
    return response.data.data
}
const withdrawAmount = async() => {
    const response = await apiClient.patch('/paymentwallet/withdraw');
    return response.data.data
}