import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import img from "../../../../Assets/user.png";
import emailjs from "emailjs-com";
import CreateOutlined from "@mui/icons-material/CreateOutlined";
import { baseUrl } from "../../../../Services/baseUrl";
import { updateDoctorAPI } from "../../../../Services/allAPIs";
import { updateDoctorContextResponse } from "../../../../ContextAPI/ContextShare";

function EditDoctorDet({docdet}) {
    const [centredModal, setCentredModal] = useState(false);

    const [switchState, setSwitchState] = useState(false);
  
    const toggleOpen = () => setCentredModal(!centredModal);
    const toggleSwitch = () => setSwitchState(!switchState);
  
    const {updateDoctorRes,setUpdateDoctorRes} = useContext(updateDoctorContextResponse)

    const [doctorDetails, setDoctorDetails] = useState({
      id:docdet._id,
      specialization: docdet.specialization,
      doctorName: docdet.doctorName,
      email: docdet.email,
      password: docdet.password,
      phone: docdet.phone,
      age: docdet.age,
      gender: docdet.gender,
      address: docdet.address,
      status: docdet.status,
      profileImage: "",
    });
  
    //to hold image file data converted into url
    const [preview, setPreview] = useState("");
    //to convert image file to url
    useEffect(() => {
      if (doctorDetails.profileImage) {
        setPreview(URL.createObjectURL(doctorDetails.profileImage));
      }
    }, [doctorDetails.profileImage]);
  
    const updateDoctor = async () => {
      const {
        id,
        specialization,
        doctorName,
        email,
        password,
        phone,
        age,
        gender,
        address,
        status,
        profileImage,
      } = doctorDetails;
      // if (
      //   !receptionName ||
      //   !email ||
      //   !password ||
      //   !phone ||
      //   !age ||
      //   !gender ||
      //   !address ||
      //   !profileImage
      // ) {
      //   alert("Please fill the form");
      // }
  
          const reqBody = new FormData();
          reqBody.append("doctorName", doctorName);
          reqBody.append("specialization", specialization);
          reqBody.append("email", email);
          reqBody.append("password", password);
          reqBody.append("phone", phone);
          reqBody.append("age", age);
          reqBody.append("gender", gender);
          reqBody.append("address", address);
          reqBody.append("status", status);
          preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",docdet.profileImage)
  
          //get Token
          const token = sessionStorage.getItem("token")
          console.log(token);
          if(token){
            const reqHeader = {
              "Content-Type":"multipart/form-data", // it indicates the request containes a image file
              "Authorization": `Bearer ${token}` //To send token from client side to server side
            }
  
            //api call
            const result = await updateDoctorAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status == 200){
              console.log(result.data);
             setUpdateDoctorRes(result.data)
              alert("Doctor updated successfully")
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
              <MDBModalTitle>Add Doctor</MDBModalTitle>
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
                            setDoctorDetails({
                              ...doctorDetails,
                              profileImage: e.target.files[0],
                            })
                          }
                        />{" "}
                        <img
                          src={preview?preview:`${baseUrl}/uploads/${docdet.profileImage}`}
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
                        value={doctorDetails.doctorName}
                        onChange={e=>setDoctorDetails({...doctorDetails,doctorName:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="specialization"
                        className="w-100"
                        variant="outlined"
                        value={doctorDetails.specialization}
                        onChange={e=>setDoctorDetails({...doctorDetails,specialization:e.target.value})}
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
                        value={doctorDetails.gender}
                        onChange={e=>setDoctorDetails({...doctorDetails,gender:e.target.value})}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Age"
                        className="w-100"
                        variant="outlined"
                        value={doctorDetails.age}
                        onChange={e=>setDoctorDetails({...doctorDetails,age:e.target.value})}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <span className="mt-3 mb-3">Contact Details</span>
                    <Col md={6}>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Address"
                    multiline
                    maxRows={4}
                    value={doctorDetails.address}
                    onChange={e=>setDoctorDetails({...doctorDetails,address:e.target.value})}
                    className="w-100"
                    />
                    <TextField
                        id="outlined-select"
                        select
                        label="Status"
                        defaultValue="" // Set an initial value or remove this line
                        className="mt-3"
                        style={{ width: "100%" }}
                        value={doctorDetails.status}
                        onChange={e=>setDoctorDetails({...doctorDetails,status:e.target.value})}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">In active</MenuItem>
                      </TextField>
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        className="w-100"
                        variant="outlined"
                        value={doctorDetails.email}
                        onChange={e=>setDoctorDetails({...doctorDetails,email:e.target.value})}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-3 w-100"
                        variant="outlined"
                        value={doctorDetails.phone}
                        onChange={e=>setDoctorDetails({...doctorDetails,phone:e.target.value})}
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
                <Button onClick={updateDoctor} variant="outlined" color="success" className="w-100">
                  Save
                </Button>
              </div>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default EditDoctorDet