import { createTransporter, getTransporter } from "../utils/email.js";
import { Promotional } from "../model/PromotionalEmail.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getPromotionalEmail = asyncHandler(async (req, res) => {
    const transporter = await createTransporter();
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email not found");
    }

    const [promotionalData, result] = await Promise.all([
        Promotional.create({ email }),
        transporter.sendMail({
            from: `"Cara Promotional Mail" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Promotional Mail Signup",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Cara Promotions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div className="container">
        <div className="header">
            <h1>Welcome to Cara Promotions</h1>
        </div>
        <div className="content">
            <h2>Thank you for signing up!</h2>
            <p>Dear Valued Customer,</p>
            <p>We're thrilled to have you join our promotional mailing list. Get ready for exclusive deals, new product announcements, and special offers tailored just for you.</p>
            <p>As a welcome gift, enjoy 10% off your next purchase with code: <strong>WELCOME10</strong></p>
            <a href="https://cara-omega-six.vercel.app" className="button">Shop Now</a>
        </div>
        <div className="footer">
            <p>© 2024 Cara E-commerce. All rights reserved.</p>
            <p>If you no longer wish to receive these emails, you can <a href="#">unsubscribe here</a>.</p>
        </div>
    </div>
</body>
</html>`
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
    const { name, email, subject, message } = req.body;
    
    if ([name, email, subject, message].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const result = await transporter.sendMail({
        from: `"Cara Contact Form" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: "New Contact Form Submission",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
        h1 {
            margin: 0;
        }
        h2 {
            color: #4CAF50;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-name {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .field-value {
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div className="header">
        <h1>New Contact Form Submission</h1>
    </div>
    <div className="content">
        <h2>Contact Details</h2>
        <div className="field">
            <div className="field-name">Name:</div>
            <div className="field-value">${name}</div>
        </div>
        <div className="field">
            <div className="field-name">Email:</div>
            <div className="field-value">${email}</div>
        </div>
        <div className="field">
            <div className="field-name">Subject:</div>
            <div className="field-value">${subject}</div>
        </div>
        <div className="field">
            <div className="field-name">Message:</div>
            <div className="field-value">${message}</div>
        </div>
    </div>
    <div className="footer">
        <p>This is an automated message from your Cara website contact form. Please do not reply to this email.</p>
    </div>
</body>
</html>`
    });

    if (!result) {
        throw new ApiError(400, "Sending Contact Email Failed");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Successfully sent Contact Form details"));
});

export { getPromotionalEmail, sendContactFormDetails };