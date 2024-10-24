import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Navigation from '../../components/shared/Navigation';
import Filter from '../../components/shared/Filter';
import ProductList from '../../components/shared/ProductList';
import { QUERY_KEYS } from '@/query/queryKeys';
import apiClient from '@/services';

interface Product {
  id: string;
  name: string;
  price: number;
  // Add other product properties
}

interface FilterState {
  category: string;
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  gender: string;
  color: string;
  latest: boolean;
  priceLowToHigh: boolean;
  priceHighToLow: boolean;
}

interface ProductResponse {
  data: Product[];
  hasMore: boolean;
  totalPages: number;
}

const VALID_CATEGORIES = ['tshirt', 'shirt', 'pants', 'bottom', 'jackets'] as const;
type ValidCategory = typeof VALID_CATEGORIES[number];

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { ref, inView } = useInView();
  
  if (!category) {
    return <div className="p-4 text-red-600">Category not found!</div>;
  }

  const isValidCategory = VALID_CATEGORIES.includes(category as ValidCategory);
  
  const [filters, setFilters] = React.useState<FilterState>({
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

  const { 
    data, 
    isFetchingNextPage, 
    isLoading,
    error, 
    hasNextPage, 
    fetchNextPage,
    refetch 
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, filters],
    retry: false,
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await apiClient.get<ProductResponse>('/products', {
          params: { 
            ...filters, 
            pageParam: pageParam,
            limit: 12 // Add a reasonable limit
          }
        });
        return {
          items: response.data.data,
          nextPage: pageParam + 1,
          totalPages: response.data.totalPages
        };
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  // Reset query when filters change
  useEffect(() => {
    console.log("Refetching")
    refetch();
  }, [filters, refetch]);

  // Handle category change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: isValidCategory ? category : "",
      searchTerm: !isValidCategory ? category : "",
    }));
  }, [category, isValidCategory]);

  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      priceLowToHigh: value === 'priceLowToHigh',
      priceHighToLow: value === 'priceHighToLow',
      latest: value === 'latest',
    }));
  }, []);

  // Safely flatten all pages of products
  const allProducts = data?.pages.reduce<Product[]>((acc, page) => {
    return [...acc, ...(page.items || [])];
  }, []) ?? [];

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
              Results for {category} - {allProducts.length} products found
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
          loadMore={() => console.log("LoadMore")}
            isError={error ? true : false}
            products={allProducts}
            productLoading={isLoading}
            buttonLoading={isFetchingNextPage}
          />
          
          {/* Infinite scroll trigger */}
          {!isLoading && !error && hasNextPage && (
            <div ref={ref} className="h-20 flex items-center justify-center">
              {isFetchingNextPage && <div>Loading more...</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;