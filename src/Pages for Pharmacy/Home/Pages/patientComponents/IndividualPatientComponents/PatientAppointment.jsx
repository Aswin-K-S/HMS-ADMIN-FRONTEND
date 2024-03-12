import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { deleteAppointmentAPI, viewSingleAppointmentAPI } from '../../../../../Services/allAPIs';
import { addAppointmentContext } from '../../../../../ContextAPI/ContextShare';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function PatientAppointment({patientId}) {

  const [singleAppointment,setSingleAppointment] = useState([])

  const {addAppointmentRes,setAddAppointmentRes} = useContext(addAppointmentContext)
    // API call to fetch all reception
    const getSingleAppointment = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
  
        try {
          const result = await viewSingleAppointmentAPI(patientId, reqHeader);
          console.log(result);
          if (result.status == 200) {
            setSingleAppointment(result.data);
          } else {
            alert("Failed to fetch record");
          }
        } catch (error) {
          console.error("Error fetching record:", error.message);
          alert("Error fetching record");
        }
      }
    };

  useEffect(()=>{
    getSingleAppointment()
  },[])


  // Function to handle appointment deletion
 const deleteAppointment = async appointmentId => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteAppointmentAPI(appointmentId, reqHeader);
      if (result.status === 200) {
        console.log('Appointment deleted successfully');
      } else {
        alert('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
      alert('Error deleting appointment');
    }
  }
};


  return (
    <div>
      
      <Container>
        <div className='d-flex justify-content-between '>
          <h5>Medical records</h5>
         
        </div>
        <Row className='mt-5'>
        {singleAppointment.map(item => (
              <Col lg={12} className='mb-4'>
                <div className='shadow-3' style={{ backgroundColor:'#F8F9FA', padding:'10px', borderRadius:'10px' }}>
                  <Container>
                    <Row>
                      <Col md={2}>
                        Date of Visit
                        <p style={{ opacity:'.6' }}>
                          {new Date(item.dateOfVisit).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </p>
                      </Col>
                      <Col md={8} style={{ overflow:'hidden' }}>
                        <p>Doctor: <span className='ms-2' style={{fontWeight:'600',fontSize:'18px'}}> {item.doctorName}</span></p>
                        <p>Description: <span className='ms-2' style={{fontWeight:'600',fontSize:'18px'}}>{item.description}</span></p>
                        <p>Status:{item.status=="pending"?<span className='ms-2' style={{fontWeight:'600',fontSize:'18px',color:'#d4de10'}}>{item.status}</span>:<span className='ms-2' style={{fontWeight:'600',fontSize:'18px',color:'green'}}>{item.status}</span>} </p>
                      </Col>
                      <Col md={2}>
                        <div className='d-flex'>
                         
                        <IconButton onClick={()=>deleteAppointment(item._id)}>
                                  <DeleteIcon
                                    className="text-danger"
                                  />
                                </IconButton>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
        ))}
        </Row>
      </Container>

    </div>
  )
}

export default PatientAppointment