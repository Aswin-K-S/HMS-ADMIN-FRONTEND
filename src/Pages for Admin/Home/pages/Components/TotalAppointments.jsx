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
import "./CSS/totalpatients.css";
import './CSS/Common.css'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const data = [
  { month: "January", appointments: 70 },
  { month: "February", appointments: 20 },
  { month: "March", appointments: 50 },
  { month: "April", appointments: 65 },
  { month: "May", appointments: 70 },
  { month: "June", appointments: 25 },
  { month: "July", appointments: 40 },
  { month: "August", appointments: 80 },
  { month: "September", appointments: 35 },
  { month: "October", appointments: 65 },
  { month: "November", appointments: 70 },
  { month: "December", appointments: 95 },
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
        fill="#7fc9ba"
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
        >{`${payload[0].payload.month}: ${payload[0].payload.appointments} `}</p>
      </div>
    );
  }

  return null;
};

function TotalAppointments() {
  return (
    <div>
      <div>
      <div className='d-flex'> <span style={{backgroundColor:'#d4fcf4',padding:'5px',borderRadius:'5px'}}><CalendarMonthOutlinedIcon sx={{fontSize:'25px',color:'#7FC9BA'}}/></span> <span className='ms-3 mt-1'> Appointments</span></div>

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
                dataKey="appointments"
                animationDuration={800}
                fill="#7fc9ba"
              />
            </BarChart>
          </ResponsiveContainer>
          <p>
            <b>120+</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TotalAppointments;
