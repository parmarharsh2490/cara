import axios from "axios";
import apiClient from "./index"

export {
    getLatestProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    getTopSelledProducts
}
 
const getLatestProducts = async () => {
   const response =  await apiClient.get("/products",{
    params : {
      limit : 10,
      skip : 0
    }
   });
   console.log(response);
   console.log(response.data.data);
   return response.data.data
}

const getTopSelledProducts = async () => {
   const response =  await apiClient.get("/products/topProducts",{
    params : {
      limit : 10,
      skip : 0
    }
   });
   console.log(response);
   console.log(response.data.data);
   return response.data.data
}

const getProductDetails = async (productId : string) => {
   const response =  await axios.get(`${apiClient}/products/${productId}`);
   return response.data.data
}

const createProduct = async (data : any) => {
  console.log(data); 
  const response = await apiClient.post('/products/create',data)
  console.log(response);
  return response
}

const updateProduct = async (data : any) => {
  console.log(data); 
  const response = await axios.patch(`${apiClient}/products/update/${data.productId}`,data, {
    headers: {
       'Content-Type': 'multipart/form-data'
    }
  });
  console.log(response);
  return response
}

const deleteProduct = async (productId : any) => {
  const response = await axios.delete(`${apiClient}/products/delete/${productId}`);
  console.log(response);
  return response
}