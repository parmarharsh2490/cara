import Loader from "@/utils/Loader.tsx";
import ProductForm from "../../../components/shared/ProductForm.tsx";
import { useGetProductDetails } from "../../../query/product.queries.ts";
import { useParams } from "react-router-dom";
import Meta from "@/utils/Meta.tsx";

const UpdateProduct = () => {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useGetProductDetails(productId || "");

  if (isLoading) return <Loader/>;

  if (error) return <div>Error loading product details. Please try again later.</div>;

  return (
    <>
      <Meta
        title="Update Product - Sara-Ecommerce"
        description="Easily update products to your store on Sara-Ecommerce. Fill in the product details, upload images, and set prices to expand your inventory."
        keywords="Sara-Ecommerce, update product, product details, upload images, set prices"
      />
      {product && <ProductForm existingProduct={product} isUpdate={true} />}
    </>
  );
};

export default UpdateProduct;
