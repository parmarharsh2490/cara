const SettingSkeleton = () => (
    <div className="container bg-slate-100 mx-auto p-4 sm:p-6 w-full animate-pulse">
      <h1 className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6" />
      {Array(4).fill("").map((_, index) => (
        <div key={index} className="bg-white mx-auto max-w-4xl shadow-md rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/4" />
            <div className="h-6 bg-blue-300 rounded-full w-6" />
          </div>
          {Array(3).fill("").map((_, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center mb-4">
              <div className="h-4 bg-gray-300 rounded w-full sm:w-1/3 mb-2 sm:mb-0" />
              <div className="h-4 bg-gray-300 rounded w-full sm:w-2/3" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  export default SettingSkeleton