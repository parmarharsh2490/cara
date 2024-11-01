import { IFilter, IProductAllDetails } from "@/types";
import apiClient from "./index"

export {
    getLatestProducts,
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    getTopSelledProducts,
    getAllProducts,
   getSellerProducts,
    viewProduct
}
 
const getLatestProducts = async (pageParam : number) => {
   const response =  await apiClient.get("/products",{
    params : {
      pageParam
    }
   });
   return response.data.data
}

const getTopSelledProducts = async (skip : number) => {
   const response =  await apiClient.get("/products/topProducts",{
    params : {
      limit : 10,
      skip 
    }
   });
   return response.data.data
}

const getProductDetails = async (productId : string) => {
   const response =  await apiClient.get(`/products/${productId}`)
   return response.data.data
}

const createProduct = async (data : IProductAllDetails) => {
  const response = await apiClient.post('/products/create',data)
  return response
}

const updateProduct = async ({ data, productId }: { data: IProductAllDetails; productId: string; }) => {
  const response = await apiClient.patch(`/products/update/${productId}`, data, {
    headers: {
       'Content-Type': 'multipart/form-data'
    }
  });
  return response;
}

const deleteProduct = async (productId : string) => {
  const response = await apiClient.delete(`/products/delete/${productId}`)
  return response
}

const getAllProducts = async(options : IFilter) => {
  const response = await apiClient.get('/products/',{
    params : options
  })
  return response.data?.data
}
const getSellerProducts = async(pageParam : number) => {
  const respose = await apiClient.get("/products/seller",{
    params : {pageParam}
  })
  return respose.data?.data
}

const viewProduct = async(productId : string) => {
  const respose = await apiClient.patch(`/products/view/${productId}`)
  return respose.data
}