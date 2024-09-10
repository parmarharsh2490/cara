import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import {createProduct, getLatestProducts} from "../services/productService.ts"
import axios from "axios"
import { IProduct } from "@/types"

const useGetLatestProducts = () => {
    return useQuery({
        queryKey : [QUERY_KEYS.LATEST_PRODUCTS],
        queryFn : getLatestProducts
})
}

const useCreateProduct = (data : any) => {
    return useMutation({
        mutationFn : (data) => createProduct(data)
    })
}

export {
    useGetLatestProducts,
    useCreateProduct
}