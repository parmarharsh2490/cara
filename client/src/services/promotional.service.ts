import { IContactForm } from "@/types/index.ts";
import apiClient from "./index.ts"

export {
    sendPromotionMail,
    sendContactformDetails
}
const sendPromotionMail = async (email : string) => {
    const response = await apiClient.post('/promotional/signup',{email});
    return response.data.data;
}

const sendContactformDetails = async (data : IContactForm) => {
    const response = await apiClient.post('/promotional/contactform',data);
    return response.data.data;
}