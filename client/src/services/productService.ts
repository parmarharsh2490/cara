import axios from "axios";
import apiClient from "./index"

export {
    getLatestProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    getTopSelledProducts,
    getAllProducts,
    getAdminProducts
}
 
const getLatestProducts = async (skip : number) => {
   const response =  await apiClient.get("/products",{
    params : {
      limit : 10,
      skip
    }
   });
   console.log(response);
   console.log(response.data.data);
   return response.data.data
}

const getTopSelledProducts = async (skip : number) => {
   const response =  await apiClient.get("/products/topProducts",{
    params : {
      limit : 10,
      skip 
    }
   });
   console.log(response);
   console.log(response.data.data);
   return response.data.data
}

const getProductDetails = async (productId : string) => {
   const response =  await apiClient.get(`/products/${productId}`)
   return response.data.data
}

const createProduct = async (data : any) => {
  console.log(data); 
  const response = await apiClient.post('/products/create',data)
  console.log(response);
  return response
}

const updateProduct = async ({ data, productId }: { data: any; productId: string; }) => {
  const response = await apiClient.patch(`/products/update/${productId}`, data, {
    headers: {
       'Content-Type': 'multipart/form-data'
    }
  });
  console.log(response);
  return response;
}

const deleteProduct = async (productId : any) => {
  const response = await axios.delete(`${apiClient}/products/delete/${productId}`);
  console.log(response);
  return response
}

const getAllProducts = async(options : any) => {
  console.log("options");
  console.log(options);
  
  const response = await apiClient.get('/products/',{
    params : options
  })
  console.log(response.data?.data);
  return response.data?.data
}
const getAdminProducts = async(skip : any) => {
  console.log(skip);
  
  const respose = await apiClient.get("/products/seller",{
    params : {skip : skip}
  })
  return respose.data?.data
}