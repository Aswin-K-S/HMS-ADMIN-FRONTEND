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
import AddReception from './Modals/AddReception';
import { addReceptionContextResponse, updateReceptionContextResponse } from '../../../ContextAPI/ContextShare';
import { allReceptionAPI, deleteReceptionAPI } from '../../../Services/allAPIs';
import img from '../../../Assets/user.png'
import { baseUrl } from '../../../Services/baseUrl';
import { CSVLink,CSVDownload } from 'react-csv';
import EditReceptionDet from './Modals/EditReceptionDet';



function Receptions() {

const [allReception, setAllReception] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [csvData, setCsvData] = useState(null);
const {updateReceptionRes,setUpdateReceptionRes} = useContext(updateReceptionContextResponse)
const { addReceptionRes, setAddReceptionRes } = useContext(
  addReceptionContextResponse
);


// API call to fetch all reception
const getAllReception = async () => {
const token = sessionStorage.getItem('token');
if (token) {
  const reqHeader = {
    "Content-Type":"multipart/form-data",
    "Authorization": `Bearer ${token}`
  };

  try {
    const result = await allReceptionAPI(reqHeader);
    if (result.status === 200) {
      setAllReception(result.data);
      console.log(result.data);
    } else {
      alert('Failed to fetch services');
    }
  } catch (error) {
    console.error('Error fetching services:', error.message);
    alert('Error fetching services');
  }
}
};

//delete
const deleteReception = async (id) => {
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      "Authorization": `Bearer ${token}`
    }
console.log(reqHeader);
      try {         
          const result = await deleteReceptionAPI(id, reqHeader);
          console.log(result);
          if (result.status == 200) {
              alert('Reception deleted successfully');
              getAllReception();
          } else {
              alert('Failed to delete Reception');
          }
      } catch (error) {
          console.error('Error deleting Reception:', error);
          alert('Failed to delete Reception');
      }
  }
};

useEffect(() => {
getAllReception();
}, [addReceptionRes,updateReceptionRes]); // Re-fetch data when the context changes

// Function to handle search query change
const handleSearchChange = (event) => {
setSearchQuery(event.target.value);
};



// Filter the medicine list based on search query and filter option
const filteredReception = allReception.filter((reception) => {
// Filter by search query
const searchFilter = reception.receptionName.toLowerCase().includes(searchQuery.toLowerCase());



return searchFilter ;
});

const exportData = () => {
  const dataToExport = filteredReception.map((reception) => ({
    Receptionist: reception.receptionName,
    Gender: reception.gender,
    Email: reception.email,
    Address: reception.address,
    Phone:reception.phone,
    Age: reception.age
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
             
          
      Receptions <br /> <br />
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
          <th scope='col'>Receptionist</th>
          
          <th scope='col'>Gender</th>
          <th scope='col'>Email</th>
       
          <th scope='col'>Age</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredReception.length>0?filteredReception.map((item,index)=>(
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
                <p className='fw-bold mb-1'>{item.receptionName}</p>
                <p className='text-muted mb-0'>{item.phone}</p>
              </div>
            </div>
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
             <EditReceptionDet recepdet={item}/>
             </IconButton>
             </Tooltip>
             <Tooltip title="Delete">
                <IconButton onClick={() => deleteReception(item._id)}>
             <DeleteIcon className=" text-danger"/>
             </IconButton>
             </Tooltip>
            
             </div>
          </td>
        </tr>
        )):<div>nothing to see here</div>
      }
      </MDBTableBody>
    </MDBTable>

            </Col>
        </Row>
      </Container>
      </div>
            
            </div>
      <AddReception/>
      
      </div>
  )
}

export default Receptions