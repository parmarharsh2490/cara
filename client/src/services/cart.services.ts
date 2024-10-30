import { IAddToCart, IUpdateCartQuantity } from "@/types/index.ts";
import apiClient from "./index.ts"

export {
    addToCart,
    getUserCart,
    updateQuantity,
    removeFromCart
}

const getUserCart = async() => {
    const response = await apiClient.get('/cart');
    return response.data.data
}

const updateQuantity = async( {cartProductId,quantity} :  IUpdateCartQuantity) => {
    const response = await apiClient.patch('/cart/update',{cartProductId,quantity});
    return response.data.data
}

const removeFromCart = async(cartProductId : string) => {
    const response = await apiClient.delete('/cart/remove', {
        params: { cartProductId },
      });
    return response.data.data
}

const addToCart = async(data : IAddToCart) => {
    const response = await apiClient.post('/cart/add',data);
    return response.data.data
}
