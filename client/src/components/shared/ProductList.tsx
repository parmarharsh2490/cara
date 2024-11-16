import { IProduct } from "@/types";
import Product from "./Product";
import ProductListSkeleton from "@/utils/skeleton/ProductListSkeleton";

type IProductListProps = {
  products: IProduct[];
  buttonLoading: boolean;
  productLoading: boolean;
  isError: boolean;
  loadMore: any;
};
const ProductList = ({
  loadMore,
  products,
  isError,
  productLoading,
  buttonLoading,
}: IProductListProps) => {
  return (
    <>
      {productLoading ? (
        <ProductListSkeleton />
      ) : (
        <div className="flex items-center justify-center flex-col lg:mx-7 mx-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-start sm:justify-items-center lg:justify-items-start">
            {products.length === 0 && isError ? (
              <h1 className="text-3xl text-center w-full whitespace-nowrap">
                No Products Found!
              </h1>
            ) : (
              products.map((product: IProduct) => (
                <Product key={product._id} product={product} />
              ))
            )}
          </div>
          <button
            disabled={isError || !products.length.toString().endsWith("0")}
            onClick={loadMore}
            name="More Products"
            aria-label="More Products"
            className={`py-[6px] px-12 text-base font-bold bg-slate-800 text-white hover:shadow-lg hover:bg-slate-900 duration-500 my-5 ${
              products.length < 1 && "hidden"
            }`}
          >
            {isError || !products.length.toString().endsWith("0")
              ? "No More Products Found"
              : buttonLoading
              ? "Loading..."
              : "VIEW ALL PRODUCTS"}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
