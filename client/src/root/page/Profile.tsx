import { UserContext } from "@/context/index.tsx";
import PopupForm from "../../components/shared/PopupForm.tsx";
import React, { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useUpdateUserDetails } from "../../query/user.queries.ts";
import { logOut } from "@/services/user.service.ts";

const Profile: React.FC = () => {
  const [showPopupForm, setShowPopupForm] = useState<boolean>(false);
  const { mutateAsync: updateUserDetails, isPending } = useUpdateUserDetails();
  const { user, setIsAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (user) {
        await logOut();
        setIsAuthenticated(false);
      }
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="w-full sm:w-[85%] px-5 py-10 sm:p-14 h-auto">
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-2xl font-semibold">My Profile</h1>
            <p className="text-slate-400 text-xs my-3">
              You can edit/update your profile information by clicking on the
              edit profile button.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-40 mt-5 p-1 border bg-slate-800 duration-500 border-slate-800 text-white flex justify-center items-center mx-5 sm:mx-0"
          >
            {user ? "Log Out" : "Login"}
          </button>
        </div>
        <div className="w-full sm:w-[70%] sm:my-5">
          <div>
            <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">
                  FULL NAME
                </p>
                <h1 className="sm:text-xl text-lg">{user?.name || "JOE"}</h1>
              </div>
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">Email</p>
                <h1 className="sm:text-xl text-lg">
                  {user?.email || "ok@gmail.com"}
                </h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">
                  PHONE NUMBER
                </p>
                <h1 className="sm:text-xl text-lg">
                  {user?.mobileNumber || "9923456789"}
                </h1>
              </div>
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">
                  ALTERNATE NUMBER
                </p>
                <h1 className="sm:text-xl text-lg">
                  {user?.alternativeNumber || "9876543219"}
                </h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-0 gap-5 mt-10 w-full justify-between items-center">
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">
                  DATE OF BIRTH
                </p>
                <h1 className="sm:text-xl text-lg">
                  {user?.dateOfBirth || "14-03-2004"}
                </h1>
              </div>
              <div className="relative w-full sm:w-1/2 text-start">
                <p className="text-xs text-slate-400 font-semibold">GENDER</p>
                <h1 className="sm:text-xl text-lg">{user?.gender || "male"}</h1>
              </div>
            </div>
            <button
              onClick={() => setShowPopupForm(!showPopupForm)}
              className="w-40 mt-5 p-1 border bg-slate-800 duration-500 border-slate-800 text-white flex justify-center items-center"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      {showPopupForm && (
        <PopupForm
          inputData={[
            { type: "string", label: "name", name: "Your Full Name" },
            { type: "number", label: "contactNumber", name: "Contact Number" },
            {
              type: "number",
              label: "alternativeNumber",
              name: "Alternative Number",
            },
            { type: "date", label: "dateOfBirth", name: "Date Of Birth" },
            { type: "string", label: "gender", name: "Gender" },
          ]}
          showPopupForm={showPopupForm}
          setShowPopupForm={setShowPopupForm}
          handleSubmitFunction={updateUserDetails}
          label="Edit Your Profile"
          isLoading={isPending}
        />
      )}
    </>
  );
};

export default Profile;
