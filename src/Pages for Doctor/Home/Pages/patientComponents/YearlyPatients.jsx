import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function YearlyPatients({count}) {
  return (
    <div>
        Yearly Patients <br /> <br />
        <div className='d-flex justify-content-between'><span style={{fontWeight:'500',fontSize:'20px'}}>{count}</span><span style={{backgroundColor:'#22C55D',padding:'5px',borderRadius:'8px'}}><CalendarMonthIcon style={{color:'white'}}/></span></div>


    </div>
  )
}

export default YearlyPatients