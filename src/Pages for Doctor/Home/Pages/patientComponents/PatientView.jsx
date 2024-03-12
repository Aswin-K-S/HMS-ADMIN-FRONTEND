import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import './Patientsview.css'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MedicalRecords from '../patientComponents/IndividualPatientComponents/MedicalRecords';
import PatientAppointment from '../patientComponents/IndividualPatientComponents/PatientAppointment';
import PatientInvoices from './IndividualPatientComponents/PatientInvoices';
import PatientInformation from './IndividualPatientComponents/PatientInformation';
import HealthInformation from './IndividualPatientComponents/HealthInformation';
import { viewSinglePatientAPI } from '../../../../Services/allAPIs';
import img from '../../../../Assets/user.png'
import { baseUrl } from '../../../../Services/baseUrl';
import { updatePatientContextResponse } from '../../../../ContextAPI/ContextShare';

function PatientView({patientId, onBack }) {

  const {updatePatientRes,setUpdatePatientRes} = useContext(updatePatientContextResponse)



    const [selectedItem, setSelectedItem] = useState('medicalRecords');
  const [singlePatient,setSinglePatient] = useState([])
    const handleItemClick = (item) => {
      setSelectedItem(item);
    };
  console.log(patientId);

    const handleBackClick = () => {
      if (onBack) {
        onBack();
      }
    };

    // API call to fetch all reception
const getSinglePatient = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization": `Bearer ${token}`
    };
  
    try {
      const result = await viewSinglePatientAPI(patientId,reqHeader);
      if (result.status == 200) {
       
        setSinglePatient(result.data);
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
  getSinglePatient()
},[updatePatientRes])
    const renderContent = () => {
        switch (selectedItem) {
          case 'medicalRecords':
            return <MedicalRecords patientId={patientId} />;
          case 'appointments':
            return <PatientAppointment patientId={patientId} />;
         
          case 'patientInformation':
            return <PatientInformation details={singlePatient} />;
          case 'healthInformation':
            return <HealthInformation patientId={patientId} details={singlePatient.healthInfo}  />;
          default:
            return null;
        }
      };

  return (
    <div>
        <div>
            <Row>
                <Col md={12}>
                <Tooltip title="Go Back">
                <IconButton onClick={handleBackClick} >
             <ReplyOutlinedIcon />
             </IconButton>
             </Tooltip> &nbsp; <span style={{fontSize:'20px',opacity:'.8'}}>{singlePatient.patientName}</span>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={4} style={{height:'100vh'}}>
                    <Container>
                <div className="card" style={{height:'auto'}}>
                <div className="card-body" >
                    <div className='d-flex flex-column justify-content-center  align-items-center'>
                    <img  src={singlePatient.profileImage ? `${baseUrl}/uploads/${singlePatient.profileImage}` : img}  style={{borderRadius:'50%',width:'150px',height:"150px"}} alt="" />

                    <h4 className='mt-2'>{singlePatient.patientName}</h4>
                    <p style={{marginTop:'-10px',opacity:'.7'}}>{singlePatient.email}</p>
                    <p style={{marginTop:'-10px'}}>{singlePatient.phone}</p>

                    <div>
                        <ul id='Patientsli' style={{listStyle:'none'}}>
                            <li className={selectedItem === 'medicalRecords' ? 'active' : ''} onClick={() => handleItemClick('medicalRecords')}>
                             <MonitorHeartIcon/>   Medical Records
                            </li>
                            <li className={selectedItem === 'appointments' ? 'active' : ''} onClick={() => handleItemClick('appointments')}>
                            <CalendarMonthIcon/>    Appointments
                            </li>
                           
                            <li className={selectedItem === 'patientInformation' ? 'active' : ''} onClick={() => handleItemClick('patientInformation')}>
                              <PersonOutlineOutlinedIcon/>  Patient Information
                            </li>
                            <li className={selectedItem === 'healthInformation' ? 'active' : ''} onClick={() => handleItemClick('healthInformation')}>
                             <FavoriteBorderOutlinedIcon/>  Health Information
                            </li>
                        </ul>
                    </div>

                    </div>
                </div>
                </div>
                    </Container>
                </Col>
                <Col md={8} style={{height:'100vh'}}>
                <div className="card" style={{height:'100vh',overflow:'scroll'}}>
                <div className="card-body">
                {renderContent()}
                    </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
  )
}

export default PatientView