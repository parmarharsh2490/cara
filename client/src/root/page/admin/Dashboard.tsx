import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, FileText, Users } from 'lucide-react';
import { BsThreeDots } from "react-icons/bs";

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
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
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

const Dashboard: React.FC = () => {
  const data = useMemo(() => [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 70 },
    { name: 'Mar', value: 50 },
    { name: 'Apr', value: 100 },
    { name: 'May', value: 20 },
    { name: 'Jun', value: 40 },
    { name: 'Jul', value: 60 },
    { name: 'Aug', value: 30 },
    { name: 'Sep', value: 50 },
    { name: 'Oct', value: 80 },
    { name: 'Nov', value: 40 },
    { name: 'Dec', value: 10 },
  ], []);

  const products = useMemo(() => [
    {
      imageUrl: "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700"
    },
    {
      imageUrl: "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700"
    },
    {
      imageUrl: "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700"
    },
    {
      imageUrl: "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700"
    },
    {
      imageUrl: "https://cdn-media.powerlook.in/catalog/product/d/p/dp-939921.jpg",
      _id: "12345678",
      title: "Light blue cargo",
      price: "2000",
      discountedPrice: "1700"
    }
  ], []);

  const handleResize = () => {
    let screenWidth = window.innerWidth;
    let chartHeight = 300; // Default for smaller screens

    if (screenWidth > 640 && screenWidth < 1024) {
      screenWidth = screenWidth * 65 / 100;
      chartHeight = 350; // Adjust for medium screens
    } else if (screenWidth >= 1024) {
      screenWidth = (screenWidth - (screenWidth * 20 / 100)) / 2;
      chartHeight = 400; // Larger height for larger screens
    }

    return { chartWidth: screenWidth - 40, chartHeight };
  };

  const [{ chartWidth, chartHeight }, setChartSize] = useState(handleResize());

  useEffect(() => {
    const resizeListener = () => {
      setChartSize(handleResize());
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  const chartComponent = useMemo(() => (
    <LineChart width={chartWidth} height={chartHeight} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#003366" fill="#e0f0ff" />
      <Line type="monotone" dataKey="value" stroke="#003366" strokeWidth={3} />
    </LineChart>
  ), [chartWidth, data]);

  return (
    <>
      <main className="bg-gray-100 container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <MetricCard
            title="Total Sales"
            value="34,945"
            change={1.56}
            icon={<ShoppingBag className="text-white" size={24} />}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Income"
            value="$37,802"
            change={-1.56}
            icon={<DollarSign className="text-white" size={24} />}
            color="bg-orange-500"
          />
          <MetricCard
            title="Orders Paid"
            value="34,945"
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
          <div className="flex items-center justify-center w-full h-full">{chartComponent}</div>
        </div>

        <div className="top-products w-full lg:w-1/2 bg-white rounded-lg shadow-md p-2 sm:p-5">
          <h1 className="text-xl font-semibold mb-5">Top Products</h1>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-2 text-base sm:text-sm md:text-base text-center">Image</th>
                <th className="p-2 text-base sm:text-sm md:text-base text-center">Title</th>
                <th className="p-2 text-base sm:text-sm md:text-base text-center">Items Sold</th>
                <th className="p-2 text-base sm:text-sm md:text-base text-center">Discounted Price</th>
                <th className="p-2 text-base sm:text-sm md:text-base text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center border-b">
                  <td className="p-2">
                    <img src={product.imageUrl} alt={product.title} className="w-14 h-14 object-cover mx-auto" />
                  </td>
                  <td className="text-xs sm:text-sm md:text-sm p-2 text-center">{product.title}</td>
                  <td className="text-xs sm:text-sm md:text-sm p-2 text-center">{product.price}</td>
                  <td className="text-xs sm:text-sm md:text-sm p-2 text-center">{product.discountedPrice}</td>
                  <td className="text-xs sm:text-sm md:text-sm p-2 text-center">4.8</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
