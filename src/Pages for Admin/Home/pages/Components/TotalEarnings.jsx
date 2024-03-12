import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import './CSS/Common.css'
const data = [
  { month: "January", earnings: 1500 },
  { month: "February", earnings: 2000 },
  { month: "March", earnings: 4000 },
  { month: "April", earnings: 7500 },
  { month: "May", earnings: 8000 },
  { month: "June", earnings: 5500 },
  { month: "July", earnings: 3000 },
  { month: "August", earnings: 5000 },
  { month: "September", earnings: 6500 },
  { month: "October", earnings: 8500 },
  { month: "November", earnings: 6000 },
  { month: "December", earnings: 8500 },
];
const CustomBar = (props) => {
  const { x, y, width, height, onMouseEnter, onMouseLeave } = props;
  const radius = 3; // Adjust the radius for rounded corners

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#FF5B51"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="custom-bar"
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p
          className="label"
          style={{ width: "auto" }}
        >{`${payload[0].payload.month}: ${payload[0].payload.earnings} `}</p>
      </div>
    );
  }

  return null;
};

function TotalEarnings() {
  return (
    <div>
       <div className='d-flex'> <span style={{backgroundColor:'#ffc5c2',padding:'5px',borderRadius:'5px'}}><CurrencyRupeeOutlinedIcon sx={{fontSize:'25px',color:'#FF5A51'}}/></span> <span className='ms-3 mt-1'> Total Earnings</span></div>

      <div
        className="bg-body-secondary rounded-5 d-flex justify-content-between p-3 mt-4"
        style={{ height: "100px" }}
      >
        <ResponsiveContainer className="custom-chart" width="70%" height={70}>
          <BarChart data={data} barCategoryGap={5}>
            <Tooltip content={<CustomTooltip />} />
            <Bar
              shape={<CustomBar />}
              barSize={6}
              dataKey="earnings"
              animationDuration={800}
              fill="#FF5B51"
            />
          </BarChart>
        </ResponsiveContainer>
        <p>
          <b>6900$</b>
        </p>
      </div>
    </div>
  );
}

export default TotalEarnings;
