import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import img from '../../../Assets/user.png'
import ChangePassword from './Components/ChangePassword';
import { updateDoctorContextResponse, updateReceptionContextResponse } from '../../../ContextAPI/ContextShare';
import { viewSingleDoctorAPI, viewSingleReceptionAPI } from '../../../Services/allAPIs';
import { baseUrl } from '../../../Services/baseUrl';
import PersonalInfo from './Components/PersonalInfo';


function SettingsRec() {

  const existinguser = JSON.parse(sessionStorage.getItem("existinguser"))

    const [selectedItem, setSelectedItem] = useState('');
  const [singleDoctor,setSingleDoctor] = useState([])

  const {updateReceptionRes,setUpdateReceptionRes} = useContext(updateReceptionContextResponse)

    const handleItemClick = (item) => {
      setSelectedItem(item);
    };

  

    // API call to fetch all reception
const getSingleDoctor = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization": `Bearer ${token}`
    };
  
    try {
      const result = await viewSingleReceptionAPI(existinguser._id,reqHeader);
      console.log(result);
      if (result.status == 200) {
       
        setSingleDoctor(result.data);
        console.log(result);
      } else {
        alert('Failed to fetch Doctor');
      }
    } catch (error) {
      console.error('Error fetching Doctor:', error.message);
      alert('Error fetching Admin');
    }
  }
  };

useEffect(()=>{
 getSingleDoctor()
},[updateReceptionRes])

    const renderContent = () => {
        switch (selectedItem) {
          case 'Information':
            return <PersonalInfo recepdet={singleDoctor} />;
          case 'Password':
            return <ChangePassword admindet={singleDoctor.password} adminId={singleDoctor._id} />;
          default:
            return null;
        }
      };

  return (
    <div>
        <div >
            <Row>
                <Col md={12}>
               &nbsp; <span style={{fontSize:'20px',opacity:'.8'}}></span>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={4} style={{height:'100vh'}}>
                    <Container>
                <div className="card" style={{height:'auto'}}>
                <div className="card-body">
                    <div className='d-flex flex-column justify-content-center  align-items-center'>
                    <img  src={singleDoctor.profileImage ? `${baseUrl}/uploads/${singleDoctor.profileImage}` : img}  style={{borderRadius:'50%',width:'150px',height:"150px"}} alt="" />

                    <h4 className='mt-2'>{singleDoctor.doctorName}</h4>
                    <p style={{marginTop:'-10px',opacity:'.7'}}>{singleDoctor.email}</p>
                    <p style={{marginTop:'-10px'}}>{singleDoctor.phone}</p>

                    <div>
                        <ul id='Patientsli' style={{listStyle:'none'}}>
                            <li className={selectedItem === 'Information' ? 'active' : ''} onClick={() => handleItemClick('Information')}>
                             <MonitorHeartIcon/>  Personal Information
                            </li>
                            <li className={selectedItem === 'Password' ? 'active' : ''} onClick={() => handleItemClick('Password')}>
                            <CalendarMonthIcon/>    Change Password
                            </li>

                        </ul>
                    </div>

                    </div>
                </div>
                </div>
                    </Container>
                </Col>
                <Col md={8} style={{height:'auto'}}>
                <div className="card" style={{height:'auto',overflow:'scroll'}}>
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

export default SettingsRec