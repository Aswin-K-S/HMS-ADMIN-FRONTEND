import React, { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Container, Row, Col } from "react-bootstrap";
import CreateOutlined from "@mui/icons-material/CreateOutlined";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import img from "../../../../Assets/user.png";
import emailjs from 'emailjs-com';
import { updateAdminAPI } from "../../../../Services/allAPIs";
import { baseUrl } from "../../../../Services/baseUrl";
import { updateAdminContext } from "../../../../ContextAPI/ContextShare";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditAdmin({admindet}) {

    
    const [centredModal, setCentredModal] = useState(false);

    const [switchState, setSwitchState] = useState(false);
  
    const toggleOpen = () => setCentredModal(!centredModal);
    const toggleSwitch = () => setSwitchState(!switchState);

    const {updateAdminRes,setUpdateAdminRes} = useContext(updateAdminContext)

    //to hold token from session storage
    const [token, setToken] = useState("");
    //to get token fomr sessionstorage
    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"));
      }
    }, []);

    //to hold project details from the form
  const [adminDetails, setAdminDetails] = useState({
    id:admindet._id,
    username: admindet.username,
    email: admindet.email,
    phone: admindet.phone,
    age: admindet.age,
    gender: admindet.gender,
    profile: "",
  });

   //to hold image file data converted into url
   const [preview, setPreview] = useState("");
   //to convert image file to url
   useEffect(() => {
     if (adminDetails.profile) {
       setPreview(URL.createObjectURL(adminDetails.profile));
     }
   }, [adminDetails.profile]);
 


   const updateAdmin = async () => {
  
        const { id,username, email,  phone, age, gender, profile } = adminDetails;
   


        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("email", email);
        reqBody.append("phone", phone);
        reqBody.append("age", age);
        reqBody.append("gender", gender);
        preview?reqBody.append("profile",profile):reqBody.append("profile",admindet.profile)

        //get Token
        const token = sessionStorage.getItem("token")
        console.log(token);
        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data", // it indicates the request containes a image file
            "Authorization": `Bearer ${token}` //To send token from client side to server side
          }

          //api call
          const result = await updateAdminAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status == 200){
            console.log(result.data);
            setUpdateAdminRes(result.data)
            alert("updated successfully")
            toggleOpen();

        
          }
          else{
            console.log(result);
          }

        //}
        }
 
  }



  return (
    <div>
           <CreateOutlined onClick={toggleOpen} color="primary" />

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Admin</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ zIndex: 1200 }}>
              <div>
                <Container>
                  <Row>
                    <span className="">Profile Image</span>
                    <Col md={12}>
                      <label>
                        {" "}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          className="form-field"
                          onChange={(e) =>
                            setAdminDetails({
                              ...adminDetails,
                              profile: e.target.files[0],
                            })
                          }
                        />{" "}
                        <img
                          src={preview?preview:`${baseUrl}/uploads/${admindet.profile}`}
                          style={{ width: "120px", height:"120px",borderRadius:'50%'}}
                          alt=""
                        />
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <span className="mt-3 mb-3">Personal Details</span>
                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Full Name"
                        className="w-100"
                        variant="outlined"
                        value={adminDetails.username}
                        onChange={e=>setAdminDetails({...adminDetails,username:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Age"
                        className="w-100"
                        variant="outlined"
                        value={adminDetails.age}
                        onChange={e=>setAdminDetails({...adminDetails,age:e.target.value})}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col md={6}>
                      <TextField
                        id="outlined-select"
                        select
                        label="Gender"
                        defaultValue="" // Set an initial value or remove this line
                        style={{ width: "100%" }}
                        value={adminDetails.gender}
                        onChange={e=>setAdminDetails({...adminDetails,gender:e.target.value})}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                    </Col>

                    <Col md={6}></Col>
                  </Row>
                  <Row className="mt-4">
                    <span className="mt-3 mb-3">Contact Details</span>
                    <Col md={6}>
                    <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-2 w-100"
                        variant="outlined"
                        value={adminDetails.phone}
                        onChange={e=>setAdminDetails({...adminDetails,phone:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        className="mt-2 w-100"
                        variant="outlined"
                        value={adminDetails.email}
                        onChange={e=>setAdminDetails({...adminDetails,email:e.target.value})}
                      />
                    
                    </Col>
                  </Row>
                </Container>
              </div>
            </MDBModalBody>

            <div className="row p-3">
              <div className="col-6">
                <Button
                  variant="outlined"
                  onClick={toggleOpen}
                  color="error"
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-6">
                <Button  onClick={updateAdmin} variant="outlined" color="success" className="w-100">
                  Save
                </Button>
              </div>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </div>
  )
}

export default EditAdmin