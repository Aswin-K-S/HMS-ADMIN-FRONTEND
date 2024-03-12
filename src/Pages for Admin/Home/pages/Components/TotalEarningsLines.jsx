import React from 'react'
import {AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Area } from 'recharts';
import './CSS/Common.css'

const data = [
    { month: "Jan", earnings: 10000 },
    { month: "Feb", earnings: 20000 },
    { month: "Mar", earnings: 40000 },
    { month: "Apr", earnings: 70000 },
    { month: "May", earnings: 80000 },
    { month: "Jun", earnings: 50000 },
    { month: "Jul", earnings: 30000 },
    { month: "Aug", earnings: 50000 },
    { month: "Sepr", earnings: 60000 },
    { month: "Oct", earnings: 80000 },
    { month: "Novr", earnings: 60000 },
    { month: "Dec", earnings: 80000 },
  ];

  const formatYAxis = (value) => {
    return `${value / 1000}k`;
  };

function TotalEarningsLines() {
    const yAxisTicks = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000];
  return (
    <div>
      <h5 style={{fontSize:'15px'}}>Earning Reports</h5>
 <ResponsiveContainer style={{opacity:'.7'}} width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis fontSize={12} ticks={yAxisTicks}  scale="linear" tickFormatter={formatYAxis}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="earnings"  animationDuration={1500} stroke="#8884d8" strokeWidth={2} strokeOpacity={0.6} dot={false}  />
          <Area type="monotone" dataKey="earnings" fill="#8884d8" fillOpacity={0.6} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TotalEarningsLines