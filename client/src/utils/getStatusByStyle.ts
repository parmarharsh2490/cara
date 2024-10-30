import { IOrderItem } from "@/types";

export const getStatusStyles = (status: IOrderItem['status']) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-600';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-600';
      case 'CONFIRMED':
        return 'bg-yellow-100 text-yellow-600';
      case 'PLACED':
        return 'bg-green-50 text-green-600'; // Light green background for PLACED status
      default:
        return '';
    }
  };
  