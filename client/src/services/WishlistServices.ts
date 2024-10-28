import apiClient from "."

export {
    addToWishlist,
    getUserWishlist,
    removeFromWishlist
}

const addToWishlist = async(data : any) => {
    const response = await apiClient.post("/wishlist/add",data);
    return response.data.data
}

const removeFromWishlist = async(wishlistId : any) => {
    console.log(wishlistId);
    
    const response = await apiClient.delete("/wishlist/remove",wishlistId);
    return response.data.data
}

const getUserWishlist = async (skip : number) => {
    const response = await apiClient.get(`/wishlist?skip=${skip}`);
    return response.data.data;
};
