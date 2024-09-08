import  {  useState } from "react";
import Navigation from "../../components/shared/Navigation";
import Filter from "../../components/shared/Filter";
import Products from "../../components/shared/ProductList";
import { useParams } from "react-router-dom";
import { IProduct } from "@/types";

const Category = () => {
  const { category } = useParams();
  const [products ] = useState<IProduct[]>([
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
    {
      imageUrl:
        "https://cdn-media.powerlook.in/catalog/product/d/p/dp_1652_7.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700",
    },
  ]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const response = await fetch(`/${category}`);
  //     const data = await response.json();
  //     (data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
          <Navigation />
          <div className="flex overflow-hidden">
            <Filter />
            <div className="border border-black overflow-hidden w-full px-4 ">
              <div className="flex justify-between items-center sm:mt-12 overflow-hidden  mb-6 md:mx-8">
                <h1 className="lg:text-2xl hidden sm:block text-base md:text-lg">
                  Results for {category} {products?.length} products found
                </h1>
                <h1 className="sm:hidden text-2xl font-bold uppercase">{category}</h1>
                <div className="flex gap-2 items-center ml-2">
                  <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">Sort By</label>

                  <select name="cars" id="cars" className="py-2">
                    <option value="Latest" selected className="text-sm md:text-base">
                      Latest
                    </option>
                    <option value="priceHighToLow" className="text-sm md:text-base">Price : High to Low</option>
                    <option value="priceLowToHigh" className="text-sm md:text-base">Price : Low to High</option>
                  </select>
                </div>
              </div>
              <Products products={products} />
            </div>
          </div>
    </>
  );
};

export default Category;
