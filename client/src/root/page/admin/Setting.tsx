import React, {  useState } from "react";
import { useGetSellerDetails, useUpdateSellerDetails, useUpdateUserDetails } from "../../../query/user.queries";
import PopupForm from "../../../components/shared/PopupForm";
import { FaEdit } from "react-icons/fa";
import { fieldMappings, getPopupLabelByLabel } from "../../../utils/labelHelpers";
import SettingSkeleton from "@/utils/skeleton/SettingSkeleton";
import RenderField from "@/utils/RenderField";
const Settings: React.FC = () => {
  const [popupContent, setPopupContent] = useState<{ 
    popupTitle: string; 
    popupLabel: string 
  }>({ 
    popupTitle: "", 
    popupLabel: "" 
  });
  const [showPopupForm, setShowPopupForm] = useState<boolean>(false);
  const [popupFields, setPopupFields] = useState<{ type: string; label: string; name: string }[]>([]);

  const { data: sellerResponse, isLoading,isFetched } = useGetSellerDetails();
  const { mutateAsync: updateSellerDetails, isPending: isUpdatingSellerDetails } = useUpdateSellerDetails();
  const { mutateAsync: updateUserDetails, isPending: isUpdatingUserDetails } = useUpdateUserDetails();

  const handleEditClick = (section: keyof typeof fieldMappings) => {
    const fields = fieldMappings[section];
    setPopupFields(fields);
    setPopupContent({ 
      popupTitle: section, 
      popupLabel: getPopupLabelByLabel(section) 
    });
    setShowPopupForm(true);
  };
  if(isLoading || !isFetched){
    return <SettingSkeleton/>
  }
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
                      className="text-blue-500 hover:text-blue-600 transition-colors cursor-pointer flex items-center p-2 rounded-full hover:bg-blue-50"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                  </div>
                  {fieldMappings[section as keyof typeof fieldMappings].map(({ name, label }) =>
                  <RenderField name={name} label={label} section={section} sellerResponse={sellerResponse}/>
                  )}
                </div>
              ))}
            </div>
      
            {showPopupForm && (
              <PopupForm
                isLoading={popupContent.popupTitle === "Personal_Information" ? isUpdatingUserDetails : isUpdatingSellerDetails}
                handleSubmitFunction={popupContent.popupTitle === "Personal_Information" ? updateUserDetails : updateSellerDetails}
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