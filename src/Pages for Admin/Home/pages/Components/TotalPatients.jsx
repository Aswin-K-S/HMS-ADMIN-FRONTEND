import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './CSS/Common.css'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';




const data = [
    { month: 'January', patients: 50 },
    { month: 'February', patients: 30 },
    { month: 'March', patients: 80 },
    { month: 'April', patients: 45 },
    { month: 'May', patients: 60 },
    { month: 'June', patients: 75 },
    { month: 'July', patients: 90 },
    { month: 'August', patients: 70 },
    { month: 'September', patients: 55 },
    { month: 'October', patients: 65 },
    { month: 'November', patients: 40 },
    { month: 'December', patients: 85 },
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
          fill="#8884d8"
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
          <p className="label" style={{width:'auto'}}>{`${payload[0].payload.month}: ${payload[0].payload.patients} `}</p>
        </div>
      );
    }
  
    return null;
  };

function TotalPatients() {
  
  return (
    <div>
     <div className='d-flex'> <span style={{backgroundColor:'#dbd9ff',padding:'5px',borderRadius:'5px'}}><GroupOutlinedIcon sx={{fontSize:'25px',color:'#8884D8'}}/></span> <span className='ms-3 mt-1'> Total patients</span></div>
   
      <div className='bg-body-secondary rounded-5 d-flex justify-content-between p-3 mt-4' style={{height:'100px'}}>
      <ResponsiveContainer className="custom-chart" width="70%" height={70}>
        <BarChart data={data} barCategoryGap={5} >
         
         
        
          <Tooltip content={<CustomTooltip />} />
          <Bar shape={<CustomBar />} barSize={6} dataKey="patients" animationDuration={800}  fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p><b>1600+</b></p>
    </div>
    </div>
  );
}

export default TotalPatients;
