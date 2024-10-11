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
        console.log(response.data);
        return response.data.data[0]
    } catch (error) {
        console.log(error);
        throw error
    }
}

const updateSellerDetails = async (data : any) => {
    try {
        const response = await apiClient.patch('/seller/update',data);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

const becomeSeller = async () => {
    try {
        const response = await apiClient.post('/seller/register',[]);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

const getDashboardDetails = async() => {
    const respose  = await apiClient.get('/seller/dashboard');
    return respose.data.data
}
const getAnalyticsDetails = async() => {
    const respose  = await apiClient.get('/seller/analytics');
    return respose.data.data
}