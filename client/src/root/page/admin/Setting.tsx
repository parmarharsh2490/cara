import PopupForm from "../../../components/shared/PopupForm";
import { IBankDetails, ISellerProfileDetails } from "@/types";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const fieldMappings: Record<string, { name: string; label: keyof ISellerProfileDetails | keyof IBankDetails,type : string }[]> = {
  "Personal_Information": [
    { name: "Full Name", label: "fullName",type : "string" },
    { name: "Primary Phone", label: "primaryPhone",type : "number"  },
    { name: "Primary Email", label: "primaryEmail",type : "string"  },
    { name: "Secondary Phone", label: "secondaryPhone",type : "number" },
    { name: "Secondary Email", label: "secondaryEmail",type : "string" },
  ],
  "Business_Information": [
    { name: "Business Name", label: "businessName",type : "string" },
    { name: "Business Address", label: "businessAddress",type : "string" },
  ],
  "Legal_Information": [
    { name: "PAN Number", label: "panNumber",type : "string" },
    { name: "Aadhar Number", label: "aadharNumber",type : "number" },
    { name: "GSTIN", label: "gstin",type : "string" },
  ],
  "Bank_Account_Details": [
    { name: "Bank Name", label: "bankName" ,type : "string"},
    { name: "IFSC Code", label: "ifscCode",type : "string" },
    { name: "Account Number", label: "accountNumber",type : "number" },
  ],
};

const Settings: React.FC = () => {
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [showPopupForm, setShowPopupForm] = useState<boolean>(false);
  const [editableFields] = useState<Record<keyof ISellerProfileDetails | keyof IBankDetails, boolean>>({
    fullName: false,
    primaryPhone: false,
    primaryEmail: false,
    secondaryPhone: false,
    secondaryEmail: false,
    businessName: false,
    businessAddress: false,
    panNumber: false,
    aadharNumber: false,
    gstin: false,
    bankName: false,
    ifscCode: false,
    accountNumber: false,
  });

  const [profileDetails, setProfileDetails] = useState<ISellerProfileDetails>({
    fullName: "John Doe",
    primaryPhone: "9876543210",
    primaryEmail: "john@example.com",
    secondaryPhone: "9876543211",
    secondaryEmail: "johnsecondary@example.com",
    businessName: "John's Electronics",
    businessAddress: "123 Main St, City, State, 123456",
    panNumber: "ABCDE1234F",
    aadharNumber: "1234 5678 9012",
    gstin: "22AAAAA0000A1Z5",
  });

  const [bankDetails, setBankDetails] = useState<IBankDetails>({
    bankName: "Example Bank",
    ifscCode: "EXAM0001234",
    accountNumber: "123456789012",
  });

  const [popupFields, setPopupFields] = useState<
    { type: string; label: string; name: string }[]
  >([]);

  const handleEditClick = (section: keyof typeof fieldMappings) => {
    const fields = fieldMappings[section];
    setPopupFields(fields);
    setPopupTitle(section);
    setShowPopupForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ISellerProfileDetails | keyof IBankDetails
  ) => {
    if (field in profileDetails) {
      setProfileDetails((prev) => ({ ...prev, [field]: e.target.value }));
    } else {
      setBankDetails((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const renderField = (
    name: string,
    label: keyof ISellerProfileDetails | keyof IBankDetails,
    isBankDetail: boolean = false
  ) => {
    const value = isBankDetail
      ? bankDetails[label as keyof IBankDetails]
      : profileDetails[label as keyof ISellerProfileDetails];
    return (
      <div className="flex flex-col sm:flex-row sm:items-center mb-4" key={label}>
        <label className="text-lg font-semibold w-full sm:w-1/3 mb-2 sm:mb-0">
          {name}:
        </label>
        <div className="flex items-center w-full sm:w-2/3">
          {editableFields[label] ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(e, label)}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          ) : (
            <span className="text-gray-700">{value}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container bg-slate-100 mx-auto p-4 sm:p-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Seller Profile Settings
        </h1>
        {Object.keys(fieldMappings).map((section) => (
          <div key={section} className="bg-white mx-auto max-w-4xl shadow-md rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">
                {section.replace(/_/g, " ")}
              </h2>
              <button
                aria-label={`Edit ${section.replace(/_/g, " ")}`}
                onClick={() => handleEditClick(section as keyof typeof fieldMappings)}
                className="text-blue-500 cursor-pointer flex items-center"
              >
                <FaEdit />
              </button>
            </div>
            {fieldMappings[section as keyof typeof fieldMappings].map(({ name, label }) =>
              renderField(name, label, section === "Bank_Account_Details")
            )}
          </div>
        ))}
      </div>

      {showPopupForm && (
        <PopupForm
          title={popupTitle}
          inputData={popupFields}
          showPopupForm={showPopupForm}
          setShowPopupForm={setShowPopupForm}
        />
      )}
    </>
  );
};

export default Settings;
