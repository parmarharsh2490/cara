import { Router } from "express";
import { getPromotionalEmail, sendContactFormDetails } from "../controller/Promotional.controller.js";

const promotionalRouter = Router();

promotionalRouter.post('/signup',getPromotionalEmail)
promotionalRouter.post('/contactform',sendContactFormDetails)

export {
    promotionalRouter
}