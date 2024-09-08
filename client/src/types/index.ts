import { HTMLInputTypeAttribute } from "react";
import { ChangeEventHandler } from 'react';

export const User = {
    name : String,
    email : String,
}

export interface IAdminProduct extends IProduct{
    
}
export interface IProduct {
    imageUrl : string,
    _id : string,
    title : string,
    discountedPrice : string,
    price : string
}
export interface IProductAllDetails{
    images : string[],
    _id : string,
    title : string,
    discountedPrice : string,
    price : string
}
export interface IFilter{
    price : string,
    colors : string,
    sleeves : string
}

interface InputData {
    type: HTMLInputTypeAttribute;
    name: string;
    label: string;
}

export interface IPopupFormProps {
    inputData: InputData[];
    showPopupForm: boolean;
    setShowPopupForm: (show: boolean) => void;
    title? : String
}

export interface IRating {
    rating: number,
      review: string,
      comment: string,
      name: string,
      date: string,
      location: string
}

export interface IInputFieldInterface {
  label: string;
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
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
    fullName: string;
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

export interface ISizeOption {
    size: string;
    stock: string;
    originalPrice: string;
    discountedPrice: string;
    gender: string;
    color: string;
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
    status: 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';
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