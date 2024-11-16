const TopProducts = ({ topProducts }: { topProducts: any }) => {
 
  return (
    <div className="top-products w-full lg:w-1/2 bg-white rounded-lg shadow-md p-2 sm:p-5">
      <h1 className="text-xl font-semibold mb-5">Top Products</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 text-base sm:text-sm md:text-base text-center">
              Image
            </th>
            <th className="p-2 text-base sm:text-sm md:text-base text-center">
              Title
            </th>
            <th className="p-2 text-base sm:text-sm md:text-base text-center">
              Quantities Sold
            </th>
            <th className="p-2 text-base sm:text-sm md:text-base text-center">
              Discounted Price
            </th>
            <th className="p-2 text-base sm:text-sm md:text-base text-center">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {topProducts.length === 0 ? <h1 className="text-xl whitespace-nowrap">No Products Found</h1> : (topProducts.map((product: any) => (
            <tr key={product._id} className="text-center border-b">
              <td className="p-2">
                <img
                loading='lazy'
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-14 h-14 object-cover mx-auto"
                />
              </td>
              <td className="text-xs sm:text-sm md:text-sm p-2 text-center">
                {product.title.length > 15 ? `${product.title.substring(0, 15)}...` : product.title}
              </td>
              <td className="text-xs sm:text-sm md:text-sm p-2 text-center">
                {product.totalTimeSelled}
              </td>
              <td className="text-xs sm:text-sm md:text-sm p-2 text-center">
                {product.price}
              </td>
              <td className="text-xs sm:text-sm md:text-sm p-2 text-center">
               {product?.averageRating?.toString().slice(0,3) ||  '0'}
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
