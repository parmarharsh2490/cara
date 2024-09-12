import axios from "axios";
import apiClient from "./index.ts";

export {
    createUserAccount,
    loginUserAccount
}

const createUserAccount = async (user: any) => {
    try {
        const response = await axios.post(`${apiClient}/user/register`, user, {
            headers: {
                "Content-Type": "application/json",  // Ensure correct content type
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user account:", error);
        throw error;
    }
}

const loginUserAccount = async (user: any) => {
    try {
        const response = await axios.post(`${apiClient}/user/login`, user, {
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
