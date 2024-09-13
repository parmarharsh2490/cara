import React from "react";
import { useNavigate } from "react-router-dom";

interface AlertDialogProps {
  isPopupVisible: boolean;
  setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  submitOnClick: () => void;
  title: string;
  description: string;
  loading : boolean;
  isSuccess:boolean;
  navigateUrl :string
}

const AlertDialog = ({
  title,
  description,
  submitOnClick,
  isPopupVisible,
  setIsPopupVisible,
  loading,
  isSuccess,
  navigateUrl
}: AlertDialogProps) => {
  const navigate = useNavigate();
  if(isSuccess){
    navigate(navigateUrl)
  }
  return (
    <>
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
          <div className="relative bg-gray-700 rounded-lg shadow-xl w-[90%] max-w-lg p-6 animate-scaleUp">
            <button
              onClick={() => setIsPopupVisible(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-100 transition-colors"
              aria-label="Close alert dialog"
            >
              ✕
            </button>
            {/* Title */}
            <h1 className="text-xl font-semibold mb-2 text-white">{title}</h1>
            {/* Description */}
            <p className="text-gray-400 mb-6">{description}</p>

            <div className="flex justify-end space-x-4">
              {/* Cancel button */}
              <button
                onClick={() => setIsPopupVisible(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-900 hover:bg-gray-200 bg-white transition-all duration-150"
              >
                Cancel
              </button>
              {/* Continue button */}
              <button
                onClick={submitOnClick}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-150"
              >
               {loading ? "Loading..." :  "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertDialog;
