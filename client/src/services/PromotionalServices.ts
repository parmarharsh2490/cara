import apiClient from "./index.ts"

export {
    sendPromotionMail,
    sendContactformDetails
}
const sendPromotionMail = async (email : string) => {
    console.log(email);
    const response = await apiClient.post('/promotional/signup',email);
    return response.data.data;
}

const sendContactformDetails = async (data : any) => {
    console.log(data);
    const response = await apiClient.post('/promotional/contactform',data);
    return response.data.data;
}