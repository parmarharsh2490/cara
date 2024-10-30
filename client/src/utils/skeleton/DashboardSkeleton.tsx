const DashboardSkeleton = () => {
    return (
      <>
      <main className="bg-gray-100 container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-pulse">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-12 w-16 rounded-full"></div>
            {/* <div className="bg-gray-300 h-4 w-1/2 rounded"></div> */}
            <div className='w-full gap-5'>
            <div className="bg-gray-300 h-4  w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4  rounded"></div>
  
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-12 w-16 rounded-full"></div>
            {/* <div className="bg-gray-300 h-4 w-1/2 rounded"></div> */}
            <div className='w-full gap-5'>
            <div className="bg-gray-300 h-4  w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4  rounded"></div>
  
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-12 w-16 rounded-full"></div>
            {/* <div className="bg-gray-300 h-4 w-1/2 rounded"></div> */}
            <div className='w-full gap-5'>
            <div className="bg-gray-300 h-4  w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4  rounded"></div>
  
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-12 w-16 rounded-full"></div>
            {/* <div className="bg-gray-300 h-4 w-1/2 rounded"></div> */}
            <div className='w-full gap-5'>
            <div className="bg-gray-300 h-4  w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4  rounded"></div>
  
            </div>
          </div>
        </div>
        
     </div>
    </main>
    <div className='w-full flex flex-col lg:flex-row gap-4'>
    <div className="recent-orders-chart flex-1  bg-white rounded-lg shadow-md sm:p-5 animate-pulse w-full lg:w-1/2">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-0 p-2">
          {/* Title Skeleton */}
          <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
          {/* Icon Skeleton */}
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        </div>
  
        {/* Chart Skeleton */}
        <div className="flex items-center justify-center w-full h-full">
          {/* Chart Container Skeleton */}
          <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    <div className="top-products w-full lg:w-1/2 bg-white rounded-lg shadow-md p-2 sm:p-5 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-5"></div>
  
        {/* Table Skeleton */}
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
                Items Sold
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
            {/* Placeholder rows for loading */}
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="text-center border-b">
                <td className="p-2">
                  <div className="w-14 h-14 bg-gray-300 rounded-full mx-auto"></div>
                </td>
                <td className="text-xs sm:text-sm md:text-sm p-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                </td>
                <td className="text-xs sm:text-sm md:text-sm p-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </td>
                <td className="text-xs sm:text-sm md:text-sm p-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </td>
                <td className="text-xs sm:text-sm md:text-sm p-2">
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
    )
  }

export default DashboardSkeleton