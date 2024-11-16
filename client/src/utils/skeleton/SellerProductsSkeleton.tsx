const SellerProductsSkeleton = () => {
  return (
    Array(10)
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
  )
}

export default SellerProductsSkeleton