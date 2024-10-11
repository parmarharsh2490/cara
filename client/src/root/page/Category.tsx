import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/shared/Navigation';
import Filter from '../../components/shared/Filter';
import ProductList from '../../components/shared/ProductList';
import { useGetAllProducts } from '../../query/ProductQueries';

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    category,
    skip: 0,
    minPrice: '',
    maxPrice: '',
    gender: '',
    color: '',
    latest: true,
    priceLowToHigh: false,
    priceHighToLow: false,
  });

  const { data: newProducts, isPending, error } = useGetAllProducts(filters);

  useEffect(() => {
    setFilters((prev :any) => ({ ...prev, category, skip: 0 }));
    setProducts([]); // Reset products when category changes
  }, [category]);
  
  useEffect(() => {
    if (newProducts && newProducts.length > 0) {
      setProducts((prev : any) => [...prev, ...newProducts]);
    }
  }, [newProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      priceLowToHigh: value === 'priceLowToHigh',
      priceHighToLow: value === 'priceHighToLow',
      latest: value === 'latest',
      skip: 0,
    });
    setProducts([]);
  };

  const loadMore = useCallback(() => {
    setFilters((prev : any) => ({ ...prev, skip: prev.skip + 10 }));
  }, []);

  if (!category) {
    return <p>Something went wrong. Category not found!</p>;
  }

  return (
    <>
      <Navigation />
      <div className="flex overflow-hidden">
        <Filter filters={filters} setFilters={setFilters} setProducts={setProducts}/>
        <div className="overflow-hidden w-full px-4">
          <div className="flex justify-between items-center sm:mt-12 overflow-hidden mb-6 md:mx-8">
            <h1 className="lg:text-2xl hidden sm:block text-base md:text-lg">
              Results for {category} - {products.length} products found
            </h1>
            <h1 className="sm:hidden text-2xl font-bold uppercase">{category}</h1>
            <div className="flex gap-2 items-center ml-2">
              <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">
                Sort By
              </label>
              <select
                name="sortby"
                id="sortby"
                className="py-2"
                onChange={handleSortChange}
                value={
                  filters.priceLowToHigh
                    ? 'priceLowToHigh'
                    : filters.priceHighToLow
                    ? 'priceHighToLow'
                    : 'latest'
                }
              >
                <option value="latest">Latest</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="priceLowToHigh">Price: Low to High</option>
              </select>
            </div>
          </div>
          
            <ProductList
            isError={!!error}
              products={products}
              buttonLoading={isPending}
              loadMore={loadMore}
              productLoading={products.length === 0 && isPending}
            />

        </div>
      </div>
    </>
  );
};

export default Category;