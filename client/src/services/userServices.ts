import apiClient from "./index";
import { ILoginUser, INewUser } from "../types/index";

export {
    createUserAccount,
    loginUserAccount,
    getUserDetails,
    updateUserDetails
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
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

const getUserDetails = async () => {
    try {
        const response = await apiClient.get("/user")
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}
const updateUserDetails = async (userDetails : any) => {
    console.log(userDetails);
    try {
        const response = await apiClient.post("/user/update",userDetails)
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}
