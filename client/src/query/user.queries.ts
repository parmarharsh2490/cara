import {
  createUserAccount,
  forgetpassword,
  getUserDetails,
  loginUserAccount,
  updateUserDetails,
} from "../services/user.service";
import {
  becomeSeller,
  getSellerDetails,
  updateSellerDetails,
} from "../services/seller.service";
import { ILoginUser, INewUser, ISeller, IUser } from "../types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";
import { UserContext } from "@/context";

export {
  useCreateUserAccount,
  useLoginUserAccount,
  useGetUserDetails,
  useGetSellerDetails,
  useUpdateSellerDetails,
  useUpdateUserDetails,
  useBecomeSeller,
  useForgetpassword
};
const useCreateUserAccount = () => {
  const { toast } = useToast();
  const { setUser,setIsAuthenticated } = useContext(UserContext);
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
    onSuccess: (data: any) => {
      setUser(data.data);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully Signed Up",
      });
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Signup Error,Please Try Again",
      });
    },
  });
};

const useLoginUserAccount = () => {
  const { toast } = useToast();
  const { setUser,setIsAuthenticated } = useContext(UserContext);
  return useMutation({
    mutationFn: (user: ILoginUser) => loginUserAccount(user),
    onSuccess: (data: any) => {
      setUser(data.data);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Successfully Logged In",
      });
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Login Error,Please Try Again",
      });
    },
  });
};

const useGetUserDetails = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUserDetails,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

const useUpdateUserDetails = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setUser } = useContext(UserContext);
  return useMutation({
    mutationFn: (data: IUser) => updateUserDetails(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      setUser(data);
      toast({
        title: "Success",
        description: "Successfully Updated User Details",
        variant: "cart",
      });
    },
  });
};

const useBecomeSeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: becomeSeller,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};

const useGetSellerDetails = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SELLERDETAILS],
    queryFn: getSellerDetails,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 300000, // 5 minutes
  });
};

const useUpdateSellerDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sellerData: ISeller) => updateSellerDetails(sellerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SELLERDETAILS] });
    },
  });
};

const useForgetpassword = () => {
  const {toast} = useToast();
  return useMutation({
    mutationFn: (email : string) => forgetpassword(email),
    onSuccess: () => {
      toast({
        title : "Successfully Send Password",
        description : "Please check your email for your new password",
        variant : "cart"
      })
    },
    onError: () => {
      toast({
        title : "Failed To Send Password",
        description : "Failed To Create new password",
        variant : "destructive"
      })
    },
  });
};
