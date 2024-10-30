import apiClient from "./index";

export {
    getSellerDetails,
    updateSellerDetails,
    becomeSeller,
    getDashboardDetails,
    getAnalyticsDetails
}

const getSellerDetails = async () => {
    try {
        const response = await apiClient.get('/seller');
        return response.data.data
    } catch (error) {
        throw error
    }
}

const updateSellerDetails = async (data : any) => {
    try {
        const response = await apiClient.patch('/seller/update',data);
        return response.data
    } catch (error) {
        throw error
    }
}

const becomeSeller = async () => {
        const response = await apiClient.post('/seller/register',[]);
        return response.data
}

const getDashboardDetails = async() => {
    const respose  = await apiClient.get('/seller/dashboard');
    return respose.data.data
}
const getAnalyticsDetails = async() => {
    const respose  = await apiClient.get('/seller/analytics');
    return respose.data.data[0]
}