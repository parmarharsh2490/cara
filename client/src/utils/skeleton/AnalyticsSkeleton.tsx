const SkeletonBox = ({ width, height }: any) => (
  <div className={`bg-gray-200 animate-pulse rounded ${width} ${height}`} />
);

const AnalyticsSkeleton = () => (
  <div className="flex flex-col w-full items-center justify-around lg:flex-row lg:flex-wrap">
    <div className="m-3 w-full max-w-[300px] lg:w-[25%] bg-white rounded-lg shadow-md sm:p-5">
      <div className="flex items-center justify-between mb-4 p-2">
        <SkeletonBox width="w-3/4" height="h-6" />
        <SkeletonBox width="w-6" height="h-6" />
      </div>
      <SkeletonBox width="w-full" height="h-40" />
    </div>

    <div className="m-3 w-full lg:w-[72%] bg-white rounded-md shadow-md p-4">
      <SkeletonBox width="w-1/2" height="h-6 mb-4" />
      <SkeletonBox width="w-full" height="h-52" />
    </div>

    <div className="flex flex-col sm:flex-row items-center justify-around w-full lg:w-[50%]">
      <div className="m-3 w-full lg:w-[100%] bg-white rounded-md shadow-lg p-4">
        <SkeletonBox width="w-1/2" height="h-6 mb-4" />
        <SkeletonBox width="w-full" height="h-40" />
      </div>
      <div className="m-3 w-full lg:w-[100%] bg-white rounded-md shadow-lg p-4">
        <SkeletonBox width="w-1/2" height="h-6 mb-4" />
        <SkeletonBox width="w-full" height="h-40" />
      </div>

      <div className="m-3 w-full lg:w-[100%] bg-white rounded-md shadow-lg p-4">
        <SkeletonBox width="w-1/2" height="h-6 mb-4" />
        <SkeletonBox width="w-full" height="h-40" />
      </div>
    </div>
  </div>
);

export default AnalyticsSkeleton;
