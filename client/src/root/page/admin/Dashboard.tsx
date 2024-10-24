import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, FileText, Users } from 'lucide-react';
import { BsThreeDots } from "react-icons/bs";
import { useGetDashboardDetails } from '../../../query/AdminQueries';
import YearReport from '../../../components/charts/YearReport';
import TopProducts from '../../../components/shared/TopProducts';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => (
  <div className="bg-white lg:gap-6 gap-4 rounded-lg shadow-md p-6 flex">
    <div className="flex justify-between items-center mb-4">
      <div className={`p-3 rounded-lg ${color}`} aria-hidden="true">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium whitespace-nowrap">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
    <div className="flex items-center">
      <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
      </span>
      <span className={`ml-1 text-sm font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {Math.abs(change)}%
      </span>
    </div>
    <div className="mt-4">
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${color.replace('bg-', 'bg-opacity-50 ')} w-3/4`}
        ></div>
      </div>
    </div>
  </div>
);

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
const Dashboard: React.FC = () => {
  const {data : dashboardData,isLoading} = useGetDashboardDetails();

  return (
    <>
    {
      isLoading ?
      <DashboardSkeleton/>
     : (
        <>
         <main className="bg-gray-100 container mx-auto p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <MetricCard
            title="Total Sales"
            value={dashboardData.orderStatistics.totalSales}
            change={1.56}
            icon={<ShoppingBag className="text-white" size={24} />}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Income"
            value={dashboardData.orderStatistics.totalEarning}
            change={-1.56}
            icon={<DollarSign className="text-white" size={24} />}
            color="bg-orange-500"
          />
          <MetricCard
            title="Orders Paid"
            value={dashboardData.orderStatistics.totalOrders}
            change={0}
            icon={<FileText className="text-white" size={24} />}
            color="bg-gray-400"
          />
          <MetricCard
            title="Total Visitor"
            value="34,945"
            change={1.56}
            icon={<Users className="text-white" size={24} />}
            color="bg-blue-500"
          />
        </div>
      </main>

      <section className="overflow-scroll flex flex-col lg:flex-row gap-6 sm:p-4 bg-gray-100">
        <div className="recent-orders-chart  flex-1 bg-white rounded-lg shadow-md sm:p-5">
          <div className=" flex items-center justify-between mb-0 p-2">
            <h1 className="sm:text-xl text-lg font-semibold">Recent Orders</h1>
            <BsThreeDots />
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <YearReport yearReport={dashboardData.yearReport}/>
            </div>
        </div>

        <TopProducts topProducts={dashboardData.topProducts}/>
      </section>
        </>
      )
    }
    </>
  );
};

export default Dashboard;