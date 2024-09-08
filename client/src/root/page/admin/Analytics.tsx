import { BsThreeDots } from 'react-icons/bs';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart,ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

const CategoryChart = () => {
 const data = [
  { name: 'Group A', value: 554 },
  { name: 'Group B', value: 244 },
  { name: 'Group C', value: 158 },
];
const COLORS = ['#1e293b', '#475569', '#94a3b8', '#e2e8f0'];


    return (
      <PieChart className='bg-white' width={210} height={180}>
        <Pie
          data={data}
          cx={100}
          cy={80}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {/* <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
      </PieChart>
    );
}

const ProgressChart = () => {
  const data = [
    { name: 'Jan', revenue: 5000, margin: 3000 },
    { name: 'Feb', revenue: 4200, margin: 2500 },
    { name: 'Mar', revenue: 6000, margin: 4000 },
    { name: 'Apr', revenue: 7500, margin: 5000 },
    { name: 'May', revenue: 6800, margin: 4500 },
    { name: 'Jun', revenue: 8000, margin: 5500 },
    { name: 'Jul', revenue: 8500, margin: 6200 },
    { name: 'Aug', revenue: 9000, margin: 7000 },
    { name: 'Sep', revenue: 9500, margin: 7300 },
    { name: 'Oct', revenue: 10000, margin: 8000 },
    { name: 'Nov', revenue: 11000, margin: 8500 },
    { name: 'Dec', revenue: 12000, margin: 9000 },
  ];

  return (
    <div className="w-full lg:w-[72%] m-3 rounded-md p-4 bg-white -black">
      <h1 className='text-2xl text-center text-green-600'>Revenue & Margin Progress (2024)</h1>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* Bar for Revenue */}
          <Bar dataKey="revenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          {/* Bar for Margin */}
          <Bar dataKey="margin" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ComposedMonthlyChart = () => {
  const data = [
  { name: 'MON', "Orders Received": 190 },
  { name: 'TUES', "Orders Received": 868 },
  { name: 'WED', "Orders Received": 1397 },
  { name: 'THU', "Orders Received": 1800 },
  { name: 'FRI', "Orders Received": 1480 },
  { name: 'SAT', "Orders Received": 1520 },
  { name: 'SUN', "Orders Received": 1400 },
];


  return (
    <div className="w-full lg:w-[45%] p-4 bg-white">
      <h1 className='text-2xl text-center text-green-600'>Your Weekly Progress</h1>
      <ResponsiveContainer width="100%" height={190}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Orders Received" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const PaymentChart = () => {
  const data = [
    { name: 'Cash', value: 40 },
    { name: 'GPay', value: 35 },
    { name: 'Paytm', value: 15 },
    { name: 'UPI', value: 10 },
  ];

  const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

  return (
    <div className="w-full   flex items-center justify-center flex-col lg:w-[45%] h-fit bg-white p-4 rounded-md shadow-lg">
      <h1 className="text-center text-xl  font-semibold">Payment Methods</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
              return (
                <text
                  x={x}
                  y={y}
                  fill="black"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProductRatingChart = () => {
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'A', value: 90, color: '#ff0000' },
    { name: 'B', value: 30, color: '#00ff00' },
    { name: 'C', value: 30, color: '#0000ff' },
  ];
  const cx = 100;
  const cy = 100;
  const iR = 50;
  const oR = 100;
  const value = 150;

  const needle = ({ value, data, cx, cy, iR, oR, color }: { value: number, data: any, cx: number, cy: number, iR: number, oR: number, color: string }) => {
    console.log(value, cx, cy, iR, oR, color);
    
    let total = 0;
    data.forEach((v : any) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (
    <div className='flex flex-col max-w-[300px]  items-center justify-center bg-white w-full lg:w-[45%] m-3 p-4 -black'>
      <h1 className='pb-2 text-xl flex flex-col'>Your Products Ratings: <span className='text-center'>Very Good </span></h1>
      <PieChart width={220} height={120}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle({value, data, cx, cy, iR, oR, color : '#d0d000'})}
      </PieChart>
    </div>
  );
};

const Analytics = () => {
  return (
   <>
    <div className="flex flex-col w-full  items-center justify-around lg:flex-row lg:flex-wrap">
     <div className="recent-orders-chart  -black m-3 w-full max-w-[300px] lg:w-[25%] h-fit overfl  flex-1 bg-white rounded-lg shadow-md sm:p-5">
    <div className=" flex items-center justify-between mb-0 p-2">
    {/* recent orders category  */}
      <h1 className="sm:text-xl text-lg font-semibold">Top Selling Category</h1>
      <BsThreeDots />
    </div>
    <div className="flex items-center justify-center mt-3"><CategoryChart/></div>
    <div className='w-full  px-2'>
    <ul className='flex items-center justify-between flex-col w-full'>
    <li className='flex items-center  p-1  w-full justify-between'>T-shirt <span className='text-slate-100 bg-slate-800 rounded-xl p-1 text-sm font-bold'>554</span></li>
    <li className='flex items-center  p-1  w-full justify-between'>Shirt <span className='text-slate-200 bg-slate-600 rounded-xl p-1 text-sm font-bold'>244</span></li>
    <li className='flex items-center  p-1  w-full justify-between'>Pant <span className='text-slate-300 bg-slate-400 rounded-xl p-1 text-sm font-bold'>158</span></li>
    </ul>
    </div>
  </div>
      <ProgressChart />
    <ComposedMonthlyChart />
      <div className='flex flex-col items-center justify-around sm:flex-row w-full lg:w-[50%] '>
      <PaymentChart />
      
      <ProductRatingChart />
      </div>
    </div>
    </>
    // </div>
  );
};

export default Analytics;
