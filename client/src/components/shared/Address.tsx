import React, { useState } from "react";
import PopupForm from "./PopupForm";

interface AddressFieldProps {
  label: string;
  value: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ label, value }) => (
  <div className="relative w-full sm:w-1/2 text-start">
    <p className="text-base sm:text-xs text-slate-400 font-semibold">
      {label}
    </p>
    <p className="text-xl">{value}</p>
  </div>
);

const Address: React.FC = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);
  // const {data : address,isLoading} = useGetUserAddress();
  // if(isLoading){
  //   return <p>Loading...</p>
  // }
  return (
    <>
      <div className="sm:py-14 sm:px-14 py-10 px-5 h-auto w-full">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-semibold text-2xl">Address</h1>
          <div
            className="flex text-red-500 justify-center items-center text-xl cursor-pointer"
            onClick={() => setShowPopupForm(!showPopupForm)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="mr-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
            </svg>
            <p>Add new address</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-between items-center">
          <AddressField label="Your Street Address" value="ogejmwosgf" />
          <AddressField label="Your Landmark" value="kkkkk" />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-between items-center">
          <AddressField label="Your Postal Code" value="ookokoo" />
          <AddressField label="Your City" value="ooo0p" />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-between items-center">
          <AddressField label="Your State" value="kkkkkkk" />
          <AddressField label="Your Country" value="ooo0p" />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full justify-between items-center">
          <AddressField label="Your Contact Number" value="9123456789" />
        </div>
      </div>

      <PopupForm
        handleSubmitFunction={() => console.log("Address")}
        inputData={[
          { type: "string", label: "streetAddress", name: "Street Address" },
          { type: "string", label: "landmark", name: "Landmark" },
          { type: "number", label: "postalCode", name: "Postal Code" },
          { type: "string", label: "city", name: "City" },
          { type: "string", label: "state", name: "State" },
          { type: "string", label: "country", name: "Country" },
          { type: "number", label: "contactNumber", name: "Contact Number" },
        ]}
        showPopupForm={showPopupForm}
        setShowPopupForm={setShowPopupForm} 
        label={"Add Your Address"}
        />
    </>
  );
};

export default Address;
