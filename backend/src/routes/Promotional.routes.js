import { Router } from "express";
import { sendContactFormDetails, sendPromotionalEmail } from "../controller/Promotional.controller.js";

const promotionalRouter = Router();

promotionalRouter.post('/signup',sendPromotionalEmail)
promotionalRouter.post('/contactform',sendContactFormDetails)

export {
    promotionalRouter
}