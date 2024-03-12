import React from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
function MonthlyPatients({count}) {
  return (
    <div>
        Monthly Patients <br /> <br />
        <div className='d-flex justify-content-between'><span style={{fontWeight:'500',fontSize:'20px'}}>{count}</span><span style={{backgroundColor:'#F97315',padding:'5px',borderRadius:'8px'}}><DateRangeIcon style={{color:'white'}}/></span></div>

    </div>
  )
}

export default MonthlyPatients