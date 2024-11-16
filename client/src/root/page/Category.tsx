import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Navigation from '../../components/shared/Navigation';
import Filter from '../../components/shared/Filter';
import ProductList from '../../components/shared/ProductList';
import { useGetAllProducts } from '@/query/product.queries';
import { allItems } from '@/utils/alItems';
import { IFilter } from '@/types';

const VALID_CATEGORIES = ['tshirt', 'shirt', 'pants', 'bottom', 'jackets'] as const;
type ValidCategory = typeof VALID_CATEGORIES[number];

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { ref, inView } = useInView();
  
  if (!category) {
    return <div className="p-4 text-red-600">Category not found!</div>;
  }

  const isValidCategory = VALID_CATEGORIES.includes(category as ValidCategory);
  
  const [filters, setFilters] = React.useState<IFilter>({
    category: isValidCategory ? category : "",
    searchTerm: !isValidCategory ? category : "",
    minPrice: '',
    maxPrice: '',
    gender: '',
    color: '',
    latest: true,
    priceLowToHigh: false,
    priceHighToLow: false,
  });

  const {  data : products,  isFetchingNextPage,  isLoading, error,  hasNextPage,  fetchNextPage, refetch } = useGetAllProducts(filters)

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: isValidCategory ? category : "",
      searchTerm: !isValidCategory ? category : "",
    }));
  }, [category, isValidCategory]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      priceLowToHigh: value === 'priceLowToHigh',
      priceHighToLow: value === 'priceHighToLow',
      latest: value === 'latest',
    }));
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex overflow-hidden">
        <Filter 
          filters={filters} 
          setFilters={setFilters}
        />
        <div className="overflow-hidden w-full px-4">
          <div className="flex justify-between items-center sm:mt-12 mb-6 md:mx-8">
            <h1 className="lg:text-2xl hidden sm:block text-base md:text-lg">
              Results for {category} - {allItems(products).length} products found
            </h1>
            <h1 className="sm:hidden text-2xl font-bold uppercase">{category}</h1>
            <div className="flex gap-2 items-center ml-2">
              <label htmlFor="sortby" className="whitespace-nowrap text-sm md:text-base font-semibold">
                Sort By
              </label>
              <select
                name="sortby"
                id="sortby"
                className="py-2 px-3 border rounded-md"
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
          loadMore={() => {}}
            isError={error ? true : false}
            products={allItems(products)}
            productLoading={isLoading}
            buttonLoading={isFetchingNextPage}
          />
          
          {/* Infinite scroll trigger */}
          {!isLoading && !error && hasNextPage && (
            <div ref={ref} className="h-20 flex items-center justify-center">
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;