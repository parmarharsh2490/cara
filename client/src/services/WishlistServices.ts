import apiClient from "."

export {
    addToWishlist,
    getUserWishlist
}

const addToWishlist = async(data : any) => {
    const response = await apiClient.post("/wishlist/add",data);
    return response.data.data
}
const getUserWishlist = async() => {
    const response = await apiClient.get("/wishlist");
    return response.data.data
}