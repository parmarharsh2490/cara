import apiClient from ".";

export {
    getProductReview,
    createProductReview,
    updateProductReview,
    deleteProductReview
}
const getProductReview = async ({productId, pageParam}) => {
    const response = await apiClient.get(`/productReview/${productId}?pageParam=${pageParam}`);
    return response.data.data[0];
};
const createProductReview = async (data: any, productId: any) => {
    console.warn(data);
    console.log(productId);
    
    const response = await apiClient.post(`/productReview/create/${productId}`,data)
    return response.data.data;
};
const updateProductReview = async ({productId, data} : {data : any,productId: any}) => {
    console.log(data);
    console.log(productId);
    
    const response = await apiClient.patch(`/productReview/update/${productId}`,data)
    return response.data.data;
};
const deleteProductReview = async (data : any) => {
    console.log(data);
    
    const response = await apiClient.delete(`/productReview/delete/${data}`)
    return response.data.data;
};
  