import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Area, Tooltip } from 'recharts';


const YearReport = ({yearReport} : {yearReport : any}) => {
    console.log(yearReport);
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
  return (
    <LineChart width={chartWidth} height={chartHeight} data={yearReport}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Area type="monotone" dataKey="value" stroke="#003366" fill="#e0f0ff" />
    <Line type="monotone" dataKey="value" stroke="#003366" strokeWidth={3} />
  </LineChart>
  )
}

export default YearReport

