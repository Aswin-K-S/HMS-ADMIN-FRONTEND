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
import { allAdminAPI, deleteAdminAPI } from '../../../Services/allAPIs';
import AddAdmin from './Modals/AddAdmin';
import { addAdminContext, updateAdminContext } from '../../../ContextAPI/ContextShare';
import EditAdmin from './Modals/EditAdmin';

function Admin() {

    const [allAdmin, setAllAdmin] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {addAdminRes,setAddAdminRes} = useContext(addAdminContext)  
    const {updateAdminRes,setUpdateAdminRes} = useContext(updateAdminContext)
    // API call to fetch all reception
    const getAllAdmin = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
      
        try {
          const result = await allAdminAPI(reqHeader);
          console.log(result);
          if (result.status === 200) {
            setAllAdmin(result.data);
            console.log(result.data);
          } else {
            alert('Failed to fetch admin');
          }
        } catch (error) {
          console.error('Error fetching admin:', error.message);
          alert('Error fetching admin');
        }
      }
      };
      
    
      //delete
    const deleteAdmin = async (id) => {
      const token = sessionStorage.getItem('token')
      console.log(token);
      if(token){
        const reqHeader={
          "Authorization": `Bearer ${token}`
        }
    console.log(reqHeader);
          try {         
              const result = await deleteAdminAPI(id, reqHeader);
              console.log(result);
              if (result.status == 200) {
                  alert('Doctor deleted successfully');
                  getAllAdmin();
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
      getAllAdmin();
      }, [addAdminRes,updateAdminRes]);

      // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    };
    
    
    
    // Filter the medicine list based on search query and filter option
    const filteredAdmin = allAdmin.filter((admin) => {
    // Filter by search query
    const searchFilter = admin.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    
    
    return searchFilter ;
    });

  return (
    <div>
        <h3 className='text-center'>Admin</h3>


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
            
          </Col>
        </Row>
        <Row>
            <Col md={12}>

            <MDBTable align='middle' className='mt-4' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Admin</th>
          <th scope='col'>Gender</th>
          <th scope='col'>Email</th>
          <th scope='col'>Age</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredAdmin.length>0?filteredAdmin.map((item,index)=>(
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={item.profile ? `${baseUrl}/uploads/${item.profile}` : img}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item.username}</p>
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
                <EditAdmin admindet={item}/>
             </IconButton>
             </Tooltip>
             <Tooltip title="Delete">
                <IconButton>
             <DeleteIcon onClick={() => deleteAdmin(item._id)} className=" text-danger"/>
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
        <AddAdmin/>
    </div>
  )
}

export default Admin