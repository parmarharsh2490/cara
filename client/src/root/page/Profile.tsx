import PopupForm from "../../components/shared/PopupForm.tsx"
import React, {   useState } from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [showPopupForm,setShowPopupForm] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
   <>
    <div onClick={(e)=>handleClick(e)} className="w-full sm:w-[85%] px-5 py-10 sm:p-14 h-auto">
      <div className="flex justify-between items-start w-full">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-slate-400 text-xs my-3">
            You can edit/update your profile information by clicking on the edit profile button.
          </p>
        </div>
        <button className="w-40 mt-5 p-1 border bg-slate-800 duration-500 border-slate-800 text-white flex justify-center items-center mx-5 sm:mx-0">
          <Link to={'/auth/sign-in'}>Login</Link>
        </button>
      </div>
      <div className="w-full sm:w-[70%] sm:my-5">
        <div>
          <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">FULL NAME</p>
              <h1 className="sm:text-xl text-lg">jo</h1>
            </div>
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">Email</p>
              <h1 className="sm:text-xl text-lg">ok@gmail.com</h1>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">PHONE NUMBER</p>
              <h1 className="sm:text-xl text-lg">iojoijo</h1>
            </div>
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">ALTERNATE NUMBER</p>
              <h1 className="sm:text-xl text-lg">ijklo</h1>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">DATE OF BIRTH</p>
              <h1 className="sm:text-xl text-lg"></h1>
            </div>
            <div className="relative w-full sm:w-1/2 text-start">
              <p className="text-xs text-slate-400 font-semibold">GENDER</p>
              <h1 className="sm:text-xl text-lg">kopk</h1>
            </div>
          </div>
          <button onClick={() => setShowPopupForm(!showPopupForm)} className="w-40 mt-5 p-1 border bg-slate-800 duration-500 border-slate-800 text-white flex justify-center items-center">
            Edit
          </button>
        </div>
      </div>
      <div style={{ position: 'fixed', zIndex: 9999, inset: '16px', pointerEvents: 'none' }}></div>
    </div>
    <PopupForm
     inputData={
      [
        {type : "string",label :"fullName",name:"Your Full Name"},
        {type : "number",label :"contactNumber",name:"Contact Number"},
        {type : "number",label :"alternativeNumber",name:"Alternative Number"},
        {type : "email",label :"email",name:"Email"},
        {type : "date",label :"dateOfBirth",name:"Date Of Birth"},
        {type : "boolean",label :"gender",name:"Gender"},
      ]} 
      showPopupForm={showPopupForm} 
      setShowPopupForm={setShowPopupForm}
      handleSubmitFunction={() => {console.log("Profile Updated")}}
      label="Edit Your Profile"
      />
   </>
  );
}

export default Profile;
