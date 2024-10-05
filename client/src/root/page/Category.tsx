import Navigation from "../../components/shared/Navigation";
import Filter from "../../components/shared/Filter";
import Products from "../../components/shared/ProductList";
import { useGetAllProducts } from "../../query/ProductQueries";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { mutateAsync: getAllProducts, isPending, error } = useGetAllProducts();

  const getProducts = async () => {
    const response = await getAllProducts({ category });
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
  }, [category]);  

  if (error) {
    return <p>Error Happened...</p>;
  }

  return (
    <>
      <Navigation />
      <div className="flex overflow-hidden">
        <Filter />
        <div className="border border-black overflow-hidden w-full px-4">
          <div className="flex justify-between items-center sm:mt-12 overflow-hidden mb-6 md:mx-8">
            <h1 className="lg:text-2xl hidden sm:block text-base md:text-lg">
              Results for {category} - {products?.length} products found
            </h1>
            <h1 className="sm:hidden text-2xl font-bold uppercase">{category}</h1>
            <div className="flex gap-2 items-center ml-2">
              <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">Sort By</label>
              <select name="sortby" id="sortby" className="py-2">
                <option value="Latest" selected className="text-sm md:text-base">Latest</option>
                <option value="priceHighToLow" className="text-sm md:text-base">Price: High to Low</option>
                <option value="priceLowToHigh" className="text-sm md:text-base">Price: Low to High</option>
              </select>
            </div>
          </div>
          <Products products={products} isLoading={isPending}/>
        </div>
      </div>
    </>
  );
};

export default Category;
