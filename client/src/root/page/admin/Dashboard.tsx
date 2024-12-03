import React from 'react';
import { useGetDashboardDetails } from '../../../query/seller.queries';
import YearReport from '../../../components/charts/YearReport';
import TopProducts from '../../../components/shared/TopProducts';
import DashboardSkeleton from '@/utils/skeleton/DashboardSkeleton';
import Meta from '@/utils/Meta';

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
        <Meta
          title="Seller Dashboard - Sara-Ecommerce"
          description="Access your seller dashboard to manage your store, view sales statistics, track orders, and analyze visitor data. Stay on top of your business with our comprehensive dashboard."
          keywords="Sara-Ecommerce, seller dashboard, sales statistics, order management, visitor analysis, store management"
        />
         <main className="bg-gray-100 container mx-auto p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <MetricCard
            title="Total Sales"
            value={dashboardData?.orderStatistics?.totalSales || 0}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Income"
            value={dashboardData?.orderStatistics?.totalEarning || 0}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dollar-sign text-white"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
            color="bg-orange-500"
          />
          <MetricCard
            title="Success Orders"
            value={dashboardData?.orderStatistics?.totalSuccessOrders || 0}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>}
            color="bg-gray-400"
          />
          <MetricCard
            title="Total Visitor"
            value={dashboardData?.totalVisitors[0]?.totalVisitorCount || 0}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
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