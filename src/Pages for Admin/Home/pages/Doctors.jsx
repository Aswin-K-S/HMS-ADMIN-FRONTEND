import React, { useContext, useEffect, useState } from 'react'
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
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import AddDoctor from './Modals/AddDoctor';
import img from '../../../Assets/user.png'
import { baseUrl } from '../../../Services/baseUrl';
import { CSVLink,CSVDownload } from 'react-csv';
import { addDoctorContextResponse, updateDoctorContextResponse } from '../../../ContextAPI/ContextShare';
import { allDoctorAPI, deleteDoctorAPI } from '../../../Services/allAPIs';
import EditDoctorDet from './Modals/EditDoctorDet';

function Doctors() {

const [allDoctor, setAllDoctor] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [csvData, setCsvData] = useState(null);

const {updateDoctorRes,setUpdateDoctorRes} = useContext(updateDoctorContextResponse)
const {addDoctorRes,setAddDoctorRes} = useContext(addDoctorContextResponse)


// API call to fetch all reception
const getAllDoctor = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization": `Bearer ${token}`
    };
  
    try {
      const result = await allDoctorAPI(reqHeader);
      if (result.status === 200) {
        setAllDoctor(result.data);
        console.log(result.data);
      } else {
        alert('Failed to fetch Doctor');
      }
    } catch (error) {
      console.error('Error fetching Doctor:', error.message);
      alert('Error fetching Doctor');
    }
  }
  };
  

  //delete
const deleteDoctor = async (id) => {
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      "Authorization": `Bearer ${token}`
    }
console.log(reqHeader);
      try {         
          const result = await deleteDoctorAPI(id, reqHeader);
          console.log(result);
          if (result.status == 200) {
              alert('Doctor deleted successfully');
              getAllDoctor();
          } else {
              alert('Failed to delete Doctor');
          }
      } catch (error) {
          console.error('Error deleting Doctor:', error);
          alert('Failed to delete Doctor');
      }
  }
};


  useEffect(() => {
  getAllDoctor();
  }, [addDoctorRes,updateDoctorRes]);  // Re-fetch data when the context changes
  
  // Function to handle search query change
  const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
  };
  
  
  
  // Filter the medicine list based on search query and filter option
  const filteredDoctor = allDoctor.filter((doctor) => {
  // Filter by search query
  const searchFilter = doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
  
  
  
  return searchFilter ;
  });
  
  const exportData = () => {
    const dataToExport = filteredDoctor.map((doctor) => ({
      Doctor: doctor.doctorName,
      Specialization: doctor.specialization,
      Gender: doctor.gender,
      Age: doctor.age,
      Email: doctor.email,
      Address: doctor.address,
      Phone: doctor.phone,
    }));
  
    setCsvData(dataToExport);
  
    // Reset csvData after a short delay to allow time for download
    setTimeout(() => {
      setCsvData(null);
    }, 1000);
  };

  
  return (
    <div>
       <div className="card" style={{height:'auto'}}>
             
             <div className="card-body">
             
         
      Doctors <br /> <br />
      <Container>
        <Row>
          <Col md={3}>
            <TextField
              id="outlined-search"
              label="Search field"
              style={{ width: "100%",backgroundColor:'#F8F9FA' }}
              value={searchQuery}
              onChange={handleSearchChange}
              type="search"
            />
          </Col>
          <Col md={3}>
           
          </Col>
          <Col md={3}>
            
          </Col>
          <Col md={3}>
            <Button onClick={exportData} variant="contained" style={{width:'100%',height:'100%',backgroundColor:'#708BB8'}} >
              Export &nbsp;   <CloudDownloadOutlinedIcon/>
            </Button>
            {csvData && <CSVDownload data={csvData} target="_blank" />}
          </Col>
        </Row>
        <Row>
            <Col md={12}>

            <MDBTable align='middle' className='mt-4' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Doctor</th>
          <th scope='col'>Specialization</th>
          <th scope='col'>Status</th>
          <th scope='col'>Gender</th>
          <th scope='col'>Email</th>
          <th scope='col'>Age</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredDoctor.length>0?filteredDoctor.map((item,index)=>(
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
                <p className='fw-bold mb-1'>{item.doctorName}</p>
                <p className='text-muted mb-0'>{item.phone}</p>
              </div>
            </div>
          </td>
          <td>{item.specialization}</td>
          <td>
            {item.status==="active"?<MDBBadge color='subtle' className='pt-1 pb-1' style={{width:'65px',fontWeight:'normal',fontSize:'12px',backgroundColor:'lightgreen',color:'#357a35'}}  pill>
              {item.status}
            </MDBBadge>:<MDBBadge color='subtle' className='pt-1 pb-1' style={{width:'65px',fontWeight:'normal',fontSize:'12px',backgroundColor:'#ffb3be',color:'#96182f'}}  pill>
              {item.status}
            </MDBBadge>}
          </td>
          <td>
          {item.gender}
          </td>
          <td>{item.email}</td>
          <td>
          {item.age}
          </td>
          <td>
            <div>
            <Tooltip title="Edit">
                <IconButton>
             <EditDoctorDet docdet={item}/>
             </IconButton>
             </Tooltip>
             <Tooltip title="Delete">
                <IconButton>
             <DeleteIcon onClick={() => deleteDoctor(item._id)} className=" text-danger"/>
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
      </Container>
      </div>
            
            </div>
     <AddDoctor/>

    </div>
  )
}

export default Doctors