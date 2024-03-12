import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function TodayPatients({count}) {
  return (
    <div>
        Today Patients <br />
        <br />
        <div className='d-flex justify-content-between'><span style={{fontWeight:'500',fontSize:'20px'}}>{count}</span><span style={{backgroundColor:'#708BB8',padding:'5px',borderRadius:'8px'}}><AccessTimeIcon style={{color:'white'}}/></span></div>


    </div>
  )
}

export default TodayPatients