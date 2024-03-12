import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import '../pages/patientComponents/Patientsview.css'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import img from '../../../Assets/user.png'
import AdminInformation from './Components/AdminInformation';
import ChangePassword from './Components/ChangePassword';
import { viewSingleAdminAPI } from '../../../Services/allAPIs';
import { baseUrl } from '../../../Services/baseUrl';
import { updateAdminContext } from '../../../ContextAPI/ContextShare';

function Settings() {

  const existinguser = JSON.parse(sessionStorage.getItem("existinguser"))

    const [selectedItem, setSelectedItem] = useState('');
  const [singleAdmin,setSingleAdmin] = useState([])

  const {updateAdminRes,setUpdateAdminRes} = useContext(updateAdminContext)

    const handleItemClick = (item) => {
      setSelectedItem(item);
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
      const result = await viewSingleAdminAPI(existinguser._id,reqHeader);
      console.log(result);
      if (result.status == 200) {
       
        setSingleAdmin(result.data);
        console.log(result);
      } else {
        alert('Failed to fetch Admin');
      }
    } catch (error) {
      console.error('Error fetching Admin:', error.message);
      alert('Error fetching Admin');
    }
  }
  };

useEffect(()=>{
  getSinglePatient()
},[updateAdminRes])

    const renderContent = () => {
        switch (selectedItem) {
          case 'Information':
            return <AdminInformation admindet={singleAdmin} />;
          case 'Password':
            return <ChangePassword admindet={singleAdmin.password} adminId={singleAdmin._id} />;
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
                    <img  src={singleAdmin.profile ? `${baseUrl}/uploads/${singleAdmin.profile}` : img}  style={{borderRadius:'50%',width:'150px',height:"150px"}} alt="" />

                    <h4 className='mt-2'>{singleAdmin.username}</h4>
                    <p style={{marginTop:'-10px',opacity:'.7'}}>{singleAdmin.email}</p>
                    <p style={{marginTop:'-10px'}}>{singleAdmin.phone}</p>

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

export default Settings