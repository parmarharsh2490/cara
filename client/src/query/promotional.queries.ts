import { IContactForm } from "@/types"
import { sendContactformDetails, sendPromotionMail } from "../services/promotional.service"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
export {
    useSendPromotionalMail,
    useSendContactformDetails
}

const useSendPromotionalMail = () => {
    const {toast} = useToast()
    return useMutation({
        mutationFn : (email : string) => sendPromotionMail(email),
        onSuccess : () => {
            toast({
                title : "Success",
                description : "Successfully Signup to Promotional Mail",
                variant : "promotion"
              })
        }
    })
}

const useSendContactformDetails = () => {
    return useMutation({
        mutationFn : (data : IContactForm) => sendContactformDetails(data),
    })
}