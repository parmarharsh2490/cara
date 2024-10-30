import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/user.service.ts";
import React, { createContext, useEffect, useState } from "react";
import { IUser } from "../types/index.ts";

const INITIAL_USER : IUser = {
  _id: "",
  name: "",
  email: "",
  gender: null,
  mobileNumber: "",
  alternativeNumber: "",
  dateOfBirth: "",
  role :"customer"
};
const INITIAL_STATE = {
  user: INITIAL_USER,
  isAuthenticated: false,
  setUser: (() => {}) as React.Dispatch<React.SetStateAction<IUser>>,
  setIsAuthenticated: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
};
export const UserContext = createContext(INITIAL_STATE);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const checkAuthUser = async () => {
    try {
      const user = await getUserDetails();
      if (user) {
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          gender: user?.gender,
          mobileNumber: user?.mobileNumber,
          alternativeNumber: user?.alternativeNumber,
          dateOfBirth: user?.dateOfBirth,
          role : user.role
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/auth/sign-in");
      }
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      setIsAuthenticated(false);
      navigate("/auth/sign-in");
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };
