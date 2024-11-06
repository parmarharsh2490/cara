import { HTMLInputTypeAttribute } from "react";
import { ChangeEventHandler } from "react";


export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
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

export interface IAddToCart {
  productId : string,sizeOptionId: string,varietyId: string,quantity : number
}

export interface ILoginUser {
  email: string;
  password: string;
}
export interface IUpdateCartQuantity {
  cartProductId : string,quantity : number
}

export interface IWishlistProduct{
  productId : string,
  imageUrl : string,
  _id :string,
  title : string,
  discountedPrice : string
}

export interface IOrderProduct{
  imageUrl : string,
  _id :string,
  title : string,
  color : string,
  size :string,
  quantity:  string,
  createdAt :string,
  paymentId : string,
  price : number
}
export interface IProduct {
  imageUrl: string;
  _id: string;
  title: string;
  discountedPrice: string;
  originalPrice: string;
  quantity?:string
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
  searchTerm? : string,
  maxPrice?: string;
  color?: string;
  gender?: string;
  category?: string;
  priceLowToHigh?: boolean | "";
  priceHighToLow?: boolean | "";
  latest?: boolean | "";
}

export interface ICartItems {
  _id : string;
  title: string;
  color: string;
  size: string;
  productId : string;
    originalPrice: number;
    discountedPrice: number;
  quantity: number;
  imageUrl: string;
  varietyId : string,
  sizeOptionId : string
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
  _id: string;
  amount: string;
  createdAt: string;
  status: string;
}

export interface ISeller {
  businessInformation: {
    businessName?: string;
    businessAddress?: string;
  };
  legalInformation: {
    panNumber?: string;
    aadharNumber?: string;
    gstin?: string;
  };
  bankAccountDetails: {
    bankName?: string;
    ifscCode?: string;
    accountNumber?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBankDetails {
  bankName: string;
  ifscCode: string;
  accountNumber: string;
}

export interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IProductReview {
  _id : string;
  ratingStar: number;
  reviewImage: string | File; 
  reviewTitle: string;
  reviewDescription: string;
  product: string; 
}

export interface IAddToWishlist {
  productId : string,sizeOptionId: string,varietyId: string
}

export interface IOrderItem {
  _id : string,
  imageUrl: string;
  title : string,
  quantity : string,
  price: number;
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
