import React from 'react';
import {  DollarSign, ShoppingBag, FileText, Users } from 'lucide-react';
import { useGetDashboardDetails } from '../../../query/seller.queries';
import YearReport from '../../../components/charts/YearReport';
import TopProducts from '../../../components/shared/TopProducts';
import DashboardSkeleton from '@/utils/skeleton/DashboardSkeleton';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
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
    <div className="mt-4">
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${color.replace('bg-', 'bg-opacity-50 ')} w-3/4`}
        ></div>
      </div>
    </div>
  </div>
);


const Dashboard: React.FC = () => {
  const {data : dashboardData,isLoading} = useGetDashboardDetails();
  if(isLoading){
    return <DashboardSkeleton/>
  }
  return (
    <>
         <main className="bg-gray-100 container mx-auto p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <MetricCard
            title="Total Sales"
            value={dashboardData.orderStatistics.totalSales}
            icon={<ShoppingBag className="text-white" size={24} />}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Income"
            value={dashboardData.orderStatistics.totalEarning}
            icon={<DollarSign className="text-white" size={24} />}
            color="bg-orange-500"
          />
          <MetricCard
            title="Success Orders"
            value={dashboardData.orderStatistics.totalSuccessOrders}
            icon={<FileText className="text-white" size={24} />}
            color="bg-gray-400"
          />
          <MetricCard
            title="Total Visitor"
            value={dashboardData.totalVisitors[0]?.totalVisitorCount || 0}
            icon={<Users className="text-white" size={24} />}
            color="bg-blue-500"
          />
        </div>
      </main>

      <section className="overflow-scroll flex flex-col lg:flex-row gap-6 sm:p-4 bg-gray-100">
            <YearReport yearReport={dashboardData.yearReport}/>
        <TopProducts topProducts={dashboardData.topProducts}/>
      </section>
    </>
  );
};

export default Dashboard;