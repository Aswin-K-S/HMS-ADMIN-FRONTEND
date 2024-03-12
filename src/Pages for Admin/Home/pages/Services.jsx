import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddService from './Modals/AddService';
import { addServiceContextResponse, updateServiceContextResponse } from '../../../ContextAPI/ContextShare';
import { allServiceAPI, deleteServiceAPI } from '../../../Services/allAPIs';
import EditService from './Modals/EditService';


function Services() {
 

  //to hold service details

const [allService, setAllService] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [filterOption, setFilterOption] = useState('All');

const {updateServiceRes,setUpdateServiceRes} = useContext(updateServiceContextResponse)

const {addServiceRes,setAddServiceRes} = useContext(
  addServiceContextResponse
);



// API call to fetch all medicines
const getAllService = async () => {
const token = sessionStorage.getItem('token');
if (token) {
  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const result = await allServiceAPI(reqHeader);
    if (result.status === 200) {
      setAllService(result.data);
    } else {
      alert('Failed to fetch services');
    }
  } catch (error) {
    console.error('Error fetching services:', error.message);
    alert('Error fetching services');
  }
}
};


const deleteService = async (id) => {
  
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      "Authorization": `Bearer ${token}`
    }
console.log(reqHeader);
      try {         
          const result = await deleteServiceAPI(id, reqHeader);
          console.log(result);
          if (result.status == 200) {
              alert('Service deleted successfully');
              getAllService();
          } else {
              alert('Failed to delete Service');
          }
      } catch (error) {
          console.error('Error deleting Service:', error);
          alert('Failed to delete Service');
      }
  }
};

useEffect(() => {
getAllService();
}, [addServiceRes,updateServiceRes]); // Re-fetch data when the context changes

// Function to handle search query change
const handleSearchChange = (event) => {
setSearchQuery(event.target.value);
};

// Function to handle filter option change
const handleFilterChange = (event) => {
setFilterOption(event.target.value);
};

// Filter the medicine list based on search query and filter option
const filteredService = allService.filter((service) => {
// Filter by search query
const searchFilter = service.serviceName.toLowerCase().includes(searchQuery.toLowerCase());

// Filter by status
let statusFilter = true;
if (filterOption !== 'All') {
  statusFilter = service.status === filterOption;
}

return searchFilter && statusFilter;
});

  return (
    <div>
      Services <br /> <br />

      <div className="card" style={{height:'auto'}}>
             
             <div className="card-body">
             <Container>
        <Row>
          <Col md={3}>
            <TextField
              id="outlined-search"
              label="Search field"
              style={{ width: "100%",backgroundColor:'#F8F9FA' }}
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={3}>
            <TextField
              id="outlined-select"
              select
              label="Sort by"
              defaultValue="All" // Set an initial value or remove this line
              value={filterOption}
              onChange={handleFilterChange}
              style={{ width: "100%" ,backgroundColor:'#F8F9FA'}}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Enabled">Enabled</MenuItem>
              <MenuItem value="Disabled">Disabled</MenuItem>
            </TextField>
          </Col>
          <Col md={3}>
           
          </Col>
          <Col md={3}>
            
          </Col>
        </Row>
        <Row>
          <Col md={12}>
          <MDBTable align='middle' className='mt-4' hover>
      <MDBTableHead className='bg-body-secondary'>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Price</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>

        </tr>
      </MDBTableHead>
      <MDBTableBody >
        {filteredService.length>0?filteredService.map((item,index)=>(
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
             
              <div className='ms-3'>
                <p className=''>{item.serviceName}</p>
              </div>
            </div>
          </td>
          <td>
           {item.price}
          </td>
          <td>{item.status==="Enabled"?<span style={{color:'green'}}>{item.status}</span>:<span style={{color:'red'}}>{item.status}</span>}</td>

          <td>
          <Tooltip title="Edit">
                <IconButton>
            <EditService servdet={item}/>
             </IconButton>
             </Tooltip>
             <Tooltip title="Delete">
                <IconButton onClick={()=>deleteService(item._id)}>
             <DeleteIcon className=" text-danger"/>
             </IconButton>
             </Tooltip>
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
        <AddService/>
       
    </div>
  )
}

export default Services