export const fieldMappings: Record<string, { name: string; label: string; type: string }[]> = {
    "Personal_Information": [
        { name: "Name", label: "name", type: "string" },
        { name: "Mobile Number", label: "mobileNumber", type: "number" },
        { name: "Email", label: "email", type: "string" },
        { name: "Alternative Number", label: "alternativeNumber", type: "number" },
    ],
    "Business_Information": [
        { name: "Business Name", label: "businessName", type: "string" },
        { name: "Business Address", label: "businessAddress", type: "string" },
    ],
    "Legal_Information": [
        { name: "PAN Number", label: "panNumber", type: "string" },
        { name: "Aadhar Number", label: "aadharNumber", type: "number" },
        { name: "GSTIN", label: "gstin", type: "string" },
    ],
    "Bank_Account_Details": [
        { name: "Bank Name", label: "bankName", type: "string" },
        { name: "IFSC Code", label: "ifscCode", type: "string" },
        { name: "Account Number", label: "accountNumber", type: "number" },
    ],
};

export const getPopupLabelByLabel = (section: string) => {
    switch (section) {
        case "Personal_Information":
            return "personalDetails";
        case "Business_Information":
            return "businessInformation";
        case "Legal_Information":
            return "legalInformation";
        case "Bank_Account_Details":
            return "bankAccountDetails";
        default:
            return "";
    }
};
