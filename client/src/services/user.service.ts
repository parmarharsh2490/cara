import apiClient from "./index";
import { ILoginUser, INewUser, IUser } from "../types/index";

export {
    createUserAccount,
    loginUserAccount,
    getUserDetails,
    updateUserDetails,
    logOut,
    forgetpassword
}

const createUserAccount = async (user: INewUser) => {
    try {
        const response = await apiClient.post("/user/register", user, {
            headers: {
                "Content-Type": "application/json",  
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user account:", error);
        throw error;
    }
}

const loginUserAccount = async (user: ILoginUser) => {
    try {
        const response = await apiClient.post("/user/login", user, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

const getUserDetails = async () => {
    try {
        const response = await apiClient.get("/user")
        return response.data.data;
    } catch (error) {
        // console.error("Error logging in user:", error);
        throw error;
    }
}

const updateUserDetails = async (userDetails : IUser) => {
    try {
        const response = await apiClient.post("/user/update",userDetails)
        return response.data.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

const logOut = async() => {
    const respose = await apiClient.post('/user/logout');
    return respose.data
}
const forgetpassword = async(email : string) => {
    console.log(email)
    const respose = await apiClient.post('/user/forgetpassword',{email});
    return respose.data
}