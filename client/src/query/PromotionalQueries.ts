import { sendContactformDetails, sendPromotionMail } from "../services/PromotionalServices"
import { useMutation } from "@tanstack/react-query"
export {
    useSendPromotionalMail,
    useSendContactformDetails
}

const useSendPromotionalMail = () => {
    return useMutation({
        mutationFn : (data : any) => sendPromotionMail(data),
        onSuccess : (data) => {
            console.log(data)
        }
    })
}

const useSendContactformDetails = () => {
    return useMutation({
        mutationFn : (data) => sendContactformDetails(data),
        onSuccess : (data) => {
            console.log(data)
        }
    })
}