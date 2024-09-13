import { ILoginUser, INewUser } from "../types/index";
export { createUserAccount, loginUserAccount, getUserDetails, updateUserDetails };
declare const createUserAccount: (user: INewUser) => Promise<any>;
declare const loginUserAccount: (user: ILoginUser) => Promise<any>;
declare const getUserDetails: () => Promise<any>;
declare const updateUserDetails: (userDetails: any) => Promise<any>;
