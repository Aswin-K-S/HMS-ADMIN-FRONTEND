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
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import './CSS/Common.css'
const data = [
  { month: "January", prescription: 70 },
  { month: "February", prescription: 40 },
  { month: "March", prescription: 60 },
  { month: "April", prescription: 25 },
  { month: "May", prescription: 85 },
  { month: "June", prescription: 45 },
  { month: "July", prescription: 50 },
  { month: "August", prescription: 10 },
  { month: "September", prescription: 65 },
  { month: "October", prescription: 25 },
  { month: "November", prescription: 90 },
  { month: "December", prescription: 75 },
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
        fill="#F9CF6D"
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
        >{`${payload[0].payload.month}: ${payload[0].payload.prescription} `}</p>
      </div>
    );
  }

  return null;
};

function TotalPrescriptions() {
  return (
    <div>
      <div className='d-flex'> <span style={{backgroundColor:'#faedcf',padding:'5px',borderRadius:'5px'}}><NoteAltOutlinedIcon sx={{fontSize:'25px',color:'#F9CF6D'}}/></span> <span className='ms-3 mt-1'> Prescriptions</span></div>

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
              dataKey="prescription"
              animationDuration={800}
              fill="#F9CF6D"
            />
          </BarChart>
        </ResponsiveContainer>
        <p>
          <b>4900+</b>
        </p>
      </div>
    </div>
  );
}

export default TotalPrescriptions;
