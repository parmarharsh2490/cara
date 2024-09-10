import axios from "axios";
import apiClient from "./index.ts"

export {
    getLatestProducts,
    createProduct
}
 
const getLatestProducts = async () => {
   const response =  await axios.get('http://localhost:3000/api/v1/products/',{
    params : {
      latestProduct : true,
      limit : 10,
      skip : 0
    }
   });
   console.log(response);
   console.log(response.data.data);
   return response.data.data
}

const createProduct = async (data) => {
  const response = await axios.post("http://localhost:3000/api/v1/products/create",data);
  console.log(response);
  return response
}