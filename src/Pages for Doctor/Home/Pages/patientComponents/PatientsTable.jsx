import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import './Css/PatientsTable.css'
import TodayPatients from "./TodayPatients";
import MonthlyPatients from "./MonthlyPatients";
import YearlyPatients from "./YearlyPatients";
import PatientView from "./PatientView";
import AddPatient from "../Modals/AddPatient";
import { allPatientAPI } from "../../../../Services/allAPIs";
import { addPatientContextResponse } from "../../../../ContextAPI/ContextShare";
import { baseUrl } from "../../../../Services/baseUrl";
import img from '../../../../Assets/user.png'



function PatientsTable() {
  const [isPatientViewVisible, setIsPatientViewVisible] = useState(false); // State variable to track the visibility of PatientView
  const [selectedPatientId, setSelectedPatientId] = useState(null); // State variable to store the selected patient ID
  const {addPatientRes,setAddPatientRes} = useContext(addPatientContextResponse)
  const  [allPatient,setAllPatient] = useState([])
  const [searchInput, setSearchInput] = useState('');


  const [todayPatientsCount, setTodayPatientsCount] = useState("6");
  const [monthlyPatientsCount, setMonthlyPatientsCount] = useState("230");
  const [yearlyPatientsCount, setYearlyPatientsCount] = useState("2540");


 

  // Function to handle the click event of the "View" button
  const handleViewClick = (id) => {
    console.log(id);
    setSelectedPatientId(id); // Set the selected patient ID
    setIsPatientViewVisible(true); // Set isPatientViewVisible to true when the button is clicked
  };
  
  const handleBack = () => {
    setIsPatientViewVisible(false);
    setSelectedPatientId(null); // Reset the selected patient ID
  };


  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredPatients = allPatient.filter((patient) =>
    Object.values(patient).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchInput.toLowerCase())
    )
  );


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
  

  

  return (
    <div>
       {!isPatientViewVisible && (
      <div>
      <Row>
          <Col md={4}>
          <div className="card" style={{height:'147px'}}>
             
             <div className="card-body">
              <TodayPatients count={todayPatientsCount}/>
             </div>
            
           </div>
          </Col>
          <Col md={4}>
          <div className="card" style={{height:'147px'}}>
             
             <div className="card-body">
              <MonthlyPatients count={monthlyPatientsCount}/>
             </div>
            
           </div>
          </Col>
          <Col md={4}>
          <div className="card" style={{height:'147px'}}>
             
             <div className="card-body">
              <YearlyPatients count={yearlyPatientsCount}/>
             </div>
            
           </div>
          </Col>
        </Row>
        <div className="card mt-4" style={{height:'auto'}}>
             
             <div className="card-body">
        <Row>
        
          <Col md={3}>

            <TextField
              id="outlined-search"
              label="Search field"
              style={{ width: "100%",backgroundColor:'#F8F9FA' }}
              type="search"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={3}>
           
          </Col>
          <Col md={3}>
        
          </Col>
          <Col md={3}>
           
          </Col>
        </Row>
        <Row>
            <Col md={12}>

            <MDBTable align='middle' className='mt-4' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Patient</th>
          <th scope='col'>Email</th>
          <th scope='col'>Gender</th>
          <th scope='col'>Date Created</th>
          <th scope='col'>Age</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {filteredPatients.length > 0 ? filteredPatients.map((item, index) => (
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <img
               src={item.profileImage ? `${baseUrl}/uploads/${item.profileImage}` : img}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item.patientName}</p>
                <p className='text-muted mb-0'>{item.phone}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{item.email}</p>
          </td>
          <td>
            <MDBBadge color='subtle' className='pt-1 pb-1' style={{width:'65px',fontWeight:'normal',fontSize:'12px',backgroundColor:'#a2a5fc',color:'#3c3e91'}}  pill>
              Male
            </MDBBadge>
          </td>
          <td>{item.date}</td>
          <td>
           {item.age}
          </td>
          <td>
            <div>
            <Tooltip title="View">
                <IconButton onClick={() => handleViewClick(item._id)}>
             <RemoveRedEyeOutlinedIcon className="text-primary" />
             </IconButton>
             </Tooltip>
            
            
             </div>
          </td>
        </tr>
     )):<div>Nothing to see here</div>
    }
      </MDBTableBody>
    </MDBTable>

            </Col>
        </Row>
        </div>
        </div>
        <AddPatient/>
      </div>
      
      )}
      
      
      {isPatientViewVisible && <PatientView patientId={selectedPatientId} onBack={handleBack} />}
     
    </div>
  );
}

export default PatientsTable;
