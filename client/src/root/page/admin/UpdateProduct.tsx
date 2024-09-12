import ProductForm from "../../../components/shared/ProductForm.tsx";
import { useEffect, useState } from "react";
import { useGetProductDetails } from "../../../query/queries.ts"; // Custom hook to fetch a product
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useGetProductDetails(productId);

  if (isLoading) return <div>Loading product details...</div>;

  if (error) return <div>Error loading product details. Please try again later.</div>;

  return (
    <>
      {product && <ProductForm existingProduct={product} isUpdate={true} />}
    </>
  );
};

export default UpdateProduct;
