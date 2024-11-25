import { createTransporter } from "../utils/email.js";
import { Promotional } from "../model/PromotionalEmail.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let promotionalTemplate = null;
let contactFormTemplate = null;
let transporter = null;

const sendPromotionalEmail = asyncHandler(async (req, res) => {
    const transporter = await createTransporter();
    
    const promotionalPath = await path.join(__dirname, '../utils', 'PromotionalMail.html');
    promotionalTemplate = await fs.readFile(promotionalPath, 'utf8');
    if (!promotionalTemplate || !transporter) {
        throw new ApiError(500, "Email resources not initialized");
    }
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email not found");
    }

    const [promotionalData, result] = await Promise.all([
        Promotional.create({ email }),
        transporter.sendMail({
            from: `"Shopy Promotional Mail" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Promotional Mail Signup",
            html: promotionalTemplate
        })
    ]);

    if (!promotionalData) {
        throw new ApiError(400, "Creating Promotional Email in Database failed");
    }

    if (!result) {
        throw new ApiError(400, "Sending Promotional Email Failed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Successfully sent Promotional Mail"));
});

const sendContactFormDetails = asyncHandler(async (req, res) => {
    const transporter = await createTransporter();
        const contactFormPath = path.join(__dirname, '../utils', 'ContactFormMail.html');
        contactFormTemplate =  await fs.readFile(contactFormPath, 'utf8');
    const { name, email, subject, message } = req.body;
    if (!contactFormTemplate || !transporter) {
        throw new ApiError(500, "Email resources not initialized");
    }
    if ([name, email, subject, message].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
    const htmlContent = contactFormTemplate
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{subject}}', subject)
    .replace('{{message}}', message);

    const result = await transporter.sendMail({
        from: `"Shopy Contact Form" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: "New Contact Form Submission",
        html: htmlContent
    })

    if (!result) {
        throw new ApiError(400, "Sending Contact Email Failed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Successfully sent Contact Form details"));
});
export  {
    sendPromotionalEmail,
    sendContactFormDetails
}