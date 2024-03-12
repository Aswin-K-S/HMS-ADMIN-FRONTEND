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
import AddMedicine from './Modals/AddMedicine';
import { AllMedicineAPI, deleteMedicineAPI } from '../../../Services/allAPIs';
import { addMedicineContextResponse,updateMedicineContextResponse } from '../../../ContextAPI/ContextShare';
import EditMedicine from './Modals/EditMedicine';


function MedicineRec() {
//to hold medicine details

const [allMedicine, setAllmedicine] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('All');


  const {updateMedicineRes,setUpdateMedicineRes} = useContext(updateMedicineContextResponse)

const { addMedicineRes, setAddMedicineRes } = useContext(
  addMedicineContextResponse
);

 

 // API call to fetch all medicines
 const getAllMedicine = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await AllMedicineAPI(reqHeader);
      if (result.status === 200) {
        setAllmedicine(result.data);
      } else {
        alert('Failed to fetch medicines');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error.message);
      alert('Error fetching medicines');
    }
  }
};


const deleteMedicine = async (id) => {
  
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      "Authorization": `Bearer ${token}`
    }
console.log(reqHeader);
      try {         
          const result = await deleteMedicineAPI(id, reqHeader);
          console.log(result);
          if (result.status == 200) {
              alert('Medicine deleted successfully');
              getAllMedicine();
          } else {
              alert('Failed to delete medicine');
          }
      } catch (error) {
          console.error('Error deleting Medicine:', error);
          alert('Failed to delete medicine');
      }
  }
};


useEffect(() => {
  getAllMedicine();
}, [addMedicineRes,updateMedicineRes]); // Re-fetch data when the context changes

// Function to handle search query change
const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};

// Function to handle filter option change
const handleFilterChange = (event) => {
  setFilterOption(event.target.value);
};

// Filter the medicine list based on search query and filter option
const filteredMedicine = allMedicine.filter((medicine) => {
  // Filter by search query
  const searchFilter = medicine.medicineName.toLowerCase().includes(searchQuery.toLowerCase());

  // Filter by status
  let statusFilter = true;
  if (filterOption !== 'All') {
    statusFilter = medicine.status === filterOption;
  }

  return searchFilter && statusFilter;
});


  return (
    <div>
      Medicine <br /> <br />
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
              defaultValue="All" 
              value={filterOption}
              onChange={handleFilterChange}
              style={{ width: "100%" ,backgroundColor:'#F8F9FA'}}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="In stock">In stock</MenuItem>
              <MenuItem value="Out of stock">Out of stock</MenuItem>
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
          <th scope='col'>InStock</th>
          <th scope='col'>Measure</th>
        

        </tr>
      </MDBTableHead>
      <MDBTableBody >
        {filteredMedicine.length>0?filteredMedicine.map((item,index)=>(
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
             
              <div className='ms-3'>
                <p className=''>{item.medicineName}</p>
              </div>
            </div>
          </td>
          <td>
           {item.price}
          </td>
          <td>
           {item.stock>0?<span style={{color:'green'}}>{item.status}</span>:<span style={{color:'red'}}>{item.status}</span>} 
          
          </td>
          <td>
            {item.stock}
          </td>
          <td>
            {item.measure}
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
       
      </div>
  )
}

export default MedicineRec