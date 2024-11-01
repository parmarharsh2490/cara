import { useEffect } from "react";
import {
  useDeleteProduct,
  useGetSellerProducts,
} from "../../../query/product.queries.ts";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Spinner from "@/utils/Spinner.tsx";
import { allProducts } from "@/utils/allProducts.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SellerProducts: React.FC = () => {
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();
  const {
    data: products,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetSellerProducts();
  const { ref, inView } = useInView();
  const handleDelete = async (productId: any) => {
    await deleteProduct(productId);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sr No.</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Picture</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="h-10 bg-gray-200 rounded w-12 mx-auto"></div>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-6 bg-blue-200 rounded w-12"></div>
                          <div className="h-6 bg-red-200 rounded w-12"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              : // Normal data state
                allProducts(products).length !== 0 &&
                allProducts(products).map((product: any, index: number) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{product.title}</td>
                    <td className="py-2 px-4 border-b">{product.price}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center justify-center">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="max-w-12 h-auto"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            navigate(`/update-product/${product._id}`)
                          }
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2 flex items-center"
                        >
                          <FaEdit className="mr-1" /> Edit
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                              <FaTrash className="mr-1" /> Delete
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this product?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product._id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center">
        <div ref={ref} className="h-20 flex items-center justify-center">
          {error ? (
            <p className="text-gray-500 text-center">No More Orders Found</p>
          ) : isFetchingNextPage ? (
            <Spinner />
          ) : (
            <p className="text-gray-500 text-center">
              Scroll to load more orders
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
