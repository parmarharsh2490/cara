import { HTMLInputTypeAttribute } from "react";
import { ChangeEventHandler } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role?: "customer" | "admin";
  gender?: "male" | "female" | "child" | "unisex" | null;
  mobileNumber?: string;
  alternativeNumber?: string;
  dateOfBirth?: string;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IAdminProduct extends IProduct {}

export interface IProduct {
  imageUrl: string;
  _id: string;
  title: string;
  discountedPrice: string;
  originalPrice: string;
}
export interface IProductAllDetails {
  _id?: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  variety: IVariety[];
  gender: string;
}

export interface IVariety {
  color: string;
  images: (string | File)[];
  sizeOptions: ISizeOption[];
}

export interface ISizeOption {
  size: string;
  stock: number;
  price: {
    originalPrice: number;
    discountedPrice: number;
    costPrice? : number
  };
}

export interface INewArrivalProduct {
  _id: string;
  title: string;
  price: {
    discountedPrice: string;
    price: string;
  };
  imageUrl: string;
}

export interface IFilter {
  minPrice?: string;
  maxPrice?: string;
  color?: string;
  gender?: string;
  category?: string;
  priceLowToHigh?: boolean | "";
  priceHighToLow?: boolean | "";
  latest?: boolean | "";
  skip : number
}

export interface ICartItems {
  _id : string;
  title: string;
  color: string;
  size: string;
  price: {
    originalPrice: number;
    discountedPrice: number;
  };
  quantity: number;
  imageUrl: string;
}
export interface InputData {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
}

export interface IPopupFormProps {
  inputData: InputData[];
  showPopupForm: boolean;
  setShowPopupForm: (show: boolean) => void;
  title?: String;
  handleSubmitFunction: any;
  label: string;
  isLoading: boolean
}

export interface IRating {
  rating: number;
  review: string;
  comment: string;
  name: string;
  date: string;
  location: string;
}

export interface IInputFieldInterface {
  label: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
  placeholder: string;
  options?: { option: string; idx: number }[];
  isTextArea?: boolean;
}

export interface ITransaction {
  id: string;
  score: number;
  stage: string;
  amount: string;
  dateTime: string;
  status: string;
  assignedTo: string;
}

export interface ISellerProfileDetails {
  name: string;
  primaryPhone: string;
  primaryEmail: string;
  secondaryPhone: string;
  secondaryEmail: string;
  businessName: string;
  businessAddress: string;
  panNumber: string;
  aadharNumber: string;
  gstin: string;
}

export interface IBankDetails {
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

export interface IOrderItem {
  image: string;
  title: string;
  price: number;
}

export interface IOrder {
  id: number;
  items: IOrderItem[];
  totalPrice: number;
  status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED";
}

export interface ITransaction {
  id: string;
  score: number;
  stage: string;
  amount: string;
  dateTime: string;
  status: string;
  assignedTo: string;
}

export interface IAddress {
  address: string;
  locality: string;
  landMark?: string;
  city: string;
  state: string;
  postalCode: number;
  country: string;
}
