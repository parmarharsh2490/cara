import { UserContext } from '@/context';
import  { useContext } from 'react'
const getSectionData = ({sellerResponse,section} : {sellerResponse : any,section : any}) => {    
    switch(section) {
      case "Business_Information":
        return sellerResponse.businessInformation || {};
      case "Legal_Information":
        return sellerResponse.legalInformation || {};
      case "Bank_Account_Details":
        return sellerResponse.bankAccountDetails || {};
      default:
        return null;
    }
  };

const RenderField = ({ name, label, section, sellerResponse }: any) => {
  let value;
  const { user } = useContext(UserContext);

  if (section === "Personal_Information") {
    value = user?.[label as keyof typeof user];
  } else {
    const sectionData = getSectionData({ sellerResponse, section });
    if (sectionData) {
      value = sectionData[label as keyof typeof sectionData];
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <label className="text-lg font-semibold w-full sm:w-1/3 mb-2 sm:mb-0">
        {name}:
      </label>
      <div className="flex items-center w-full sm:w-2/3">
        <span className="text-gray-700">{value || "Not Provided"}</span>
      </div>
    </div>
  );
};
export default RenderField