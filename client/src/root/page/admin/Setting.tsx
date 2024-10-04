import { useGetSellerDetails, useUpdateSellerDetails } from "../../../query/UserQueries.ts";
import PopupForm from "../../../components/shared/PopupForm";
import { IBankDetails, ISellerProfileDetails } from "@/types";
import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UserContext } from "../../../context/index.tsx";
import { fieldMappings, getPopupLabelByLabel } from "../../../utils/labelHelpers.ts";

const Settings: React.FC = () => {
    const [popupContent, setPopupContent] = useState({ popupTitle: "", popupLabel: "" });
    const [showPopupForm, setShowPopupForm] = useState<boolean>(false);
    const { data: sellerDetail, isLoading, isPending } = useGetSellerDetails();
    const { mutateAsync: updateSellerDetails } = useUpdateSellerDetails();
    const { user } = useContext(UserContext);

    const [popupFields, setPopupFields] = useState<{ type: string; label: string; name: string }[]>([]);

    const handleEditClick = (section: keyof typeof fieldMappings) => {
        const fields = fieldMappings[section];
        setPopupFields(fields);
        setPopupContent({ popupTitle: section, popupLabel: getPopupLabelByLabel(section) });
        setShowPopupForm(true);
    };

    const renderField = (name: string, label: keyof ISellerProfileDetails | keyof IBankDetails, section: string) => {
        let value: any;
        if (section === "Personal_Information") {
            value = user?.[label as keyof typeof user];
        }
        const sectionValue = getPopupLabelByLabel(section)
        return (
            <div className="flex flex-col sm:flex-row sm:items-center mb-4" key={label}>
                <label className="text-lg font-semibold w-full sm:w-1/3 mb-2 sm:mb-0">{name}:</label>
                <div className="flex items-center w-full sm:w-2/3">
                    <span className="text-gray-700">{value ? value : sellerDetail?.[sectionValue]?.[label] ? sellerDetail?.[sectionValue]?.[label] : "Not Provided"}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            {isLoading || isPending ? (
                <div className="w-full h-full flex items-center justify-center">
                <img src="/spinner.svg" width={150} />
                </div>
            ) : (
                <div className="container bg-slate-100 mx-auto p-4 sm:p-6 w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Seller Profile Settings</h1>
                    {Object.keys(fieldMappings).map((section) => (
                        <div key={section} className="bg-white mx-auto max-w-4xl shadow-md rounded-lg p-4 sm:p-6 mb-6">
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold">{section.replace(/_/g, " ")}</h2>
                                <button
                                    aria-label={`Edit ${section.replace(/_/g, " ")}`}
                                    onClick={() => handleEditClick(section as keyof typeof fieldMappings)}
                                    className="text-blue-500 cursor-pointer flex items-center"
                                >
                                    <FaEdit />
                                </button>
                            </div>
                            {fieldMappings[section as keyof typeof fieldMappings].map(({ name, label }) => renderField(name, label as keyof ISellerProfileDetails | keyof IBankDetails, section))}
                        </div>
                    ))}
                </div>
            )}
            {showPopupForm && (
                <PopupForm
                    handleSubmitFunction={updateSellerDetails}
                    title={popupContent.popupTitle}
                    inputData={popupFields}
                    showPopupForm={showPopupForm}
                    setShowPopupForm={setShowPopupForm}
                    label={popupContent.popupLabel}
                />
            )}
        </>
    );
};

export default Settings;
