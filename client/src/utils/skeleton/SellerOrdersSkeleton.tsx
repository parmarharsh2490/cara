const SelleOrderSkeleton = () => {
    return <div className="container mx-auto px-4 py-8 flex flex-col">
    <div className='flex items-center justify-between mb-6 flex-col sm:flex-row'>
      <h1 className="text-2xl md:text-3xl font-bold bg-gray-200 rounded-lg h-6 w-32"></h1>
      <div className="flex gap-2 items-center mt-4 md:mt-0">
        <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
        <div className="bg-gray-200 rounded-lg h-8 w-36"></div>
      </div>
    </div>
  
    <div className="overflow-x-auto">
      <table className="hidden md:table min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {Array(5).fill(null).map((_, index) => (
              <th key={index} className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(7).fill(null).map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-16"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-gray-200 rounded-lg h-8 w-24"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <div className="md:hidden space-y-4">
        {Array(7).fill(null).map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 rounded-lg w-20 h-20"></div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
                <div className="bg-gray-200 rounded-lg h-4 w-20 mt-1"></div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
              <div className="bg-gray-200 rounded-lg h-6 w-24"></div>
              <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-lg h-8 w-full"></div>
            </div>
          </div>
        ))}
      </div>
  
      <button className="mt-6 w-full bg-gray-200 rounded-lg h-12"></button>
    </div>
  </div>
  
  }


export default SelleOrderSkeleton