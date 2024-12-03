import Meta from "@/utils/Meta.tsx";
import ProductForm from "../../../components/shared/ProductForm.tsx";

const AddProduct = () => {
  return (
    <>
      <Meta
        title="Add New Product - Sara-Ecommerce"
        description="Easily add new products to your store on Sara-Ecommerce. Fill in the product details, upload images, and set prices to expand your inventory."
        keywords="Sara-Ecommerce, add product, new product, product details, upload images, set prices"
      />
      <ProductForm />
    </>
  );
};

export default AddProduct;
