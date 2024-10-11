import apiClient from ".";

export {
    getProductReview,
    createProductReview,
    updateProductReview,
    deleteProductReview
}
const getProductReview = async (productId: string, skip: number) => {
    const response = await apiClient.get(`/productReview/${productId}?skip=${skip}`);
    return response.data.data[0];
};
const createProductReview = async (data: any, productId: any) => {
    console.warn(data);
    console.log(productId);
    
    const response = await apiClient.post(`/productReview/create/${data.productId}`,data.data)
    return response.data.data;
};
const updateProductReview = async (data : any) => {
    const response = await apiClient.post("/productReview/update",data)
    return response.data.data;
};
const deleteProductReview = async (data : any) => {
    console.log(data);
    
    const response = await apiClient.delete(`/productReview/delete/${data}`)
    return response.data.data;
};
  