import React, { useContext, useEffect, useState } from 'react'
import './CSS/Common.css'
import img5 from '../../../../Assets/img5.jpg'
import { allPatientAPI } from '../../../../Services/allAPIs';
import { addPatientContextResponse } from '../../../../ContextAPI/ContextShare';
import img from '../../../../Assets/user.png'
import { baseUrl } from '../../../../Services/baseUrl';

function RecentPatients() {

  const  [allPatient,setAllPatient] = useState([])
  const {addPatientRes,setAddPatientRes} = useContext(addPatientContextResponse)
  // API call to fetch all reception
const getAllPatient = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization": `Bearer ${token}`
    };
  
    try {
      const result = await allPatientAPI(reqHeader);
      if (result.status === 200) {
        result.data.forEach(patient => {
          let utcDate = new Date(patient.date);
          patient.date = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        });
        setAllPatient(result.data);
        console.log(result.data);
      } else {
        alert('Failed to fetch Patient');
      }
    } catch (error) {
      console.error('Error fetching Patient:', error.message);
      alert('Error fetching Patient');
    }
  }
  };

  useEffect(()=>{
    getAllPatient()
  },[addPatientRes])


  const getTimeFromDate = (dateString) => {
    // Split the date string into date and time parts
    const [datePart, timePart] = dateString.split(', ');
    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split('/');
    // Split the time part into hours, minutes, and seconds
    const [time, meridian] = timePart.split(' ');
    const [hours, minutes, seconds] = time.split(':');
    
    // Create a new Date object with the extracted components
    const dateObj = new Date(`${month}/${day}/${year} ${time} ${meridian}`);
  
    // Format the time components
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  
    // Construct the time string
    return `${formattedHours}:${formattedMinutes} ${meridian}`;
  };

  return (
    <div>
       <span> Recent patients</span> <br /><br />
       
       <div>
       {allPatient.slice(0, 5).map(patient => (
        <div>
        <div key={patient._id} className='d-flex flex-row' style={{marginBottom:'-15px'}} >
           <div className="row "style={{width:'300px'}}>
            <div className="col-3"> <img
                src={patient.profileImage ? `${baseUrl}/uploads/${patient.profileImage}` : img}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /></div>
            <div className="col-6"><p style={{fontSize:'14px'}}>{patient.patientName}</p><p style={{fontSize:'12px',marginTop:'-10px',opacity:'.7'}}>{patient.phone}</p></div>
            <div className="col-3"><p className='mt-3' style={{fontSize:'13px',marginLeft:'-10px',opacity:'.8'}}> {getTimeFromDate(patient.date)}</p></div>
           </div>
        </div>
        <hr />
        </div>
       ))}
      
        </div>
    </div>
  )
}

export default RecentPatients