import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import img from "../../../../../Assets/user.png";
import { baseUrl } from '../../../../../Services/baseUrl';
import Button from "@mui/material/Button";
import { updatePatientAPI } from '../../../../../Services/allAPIs';
import { updatePatientContextResponse } from '../../../../../ContextAPI/ContextShare';

function PatientInformation({details}) {
console.log(details);

const {updatePatientRes,setUpdatePatientRes} = useContext(updatePatientContextResponse)

const [patientDetails,setPatientDetails] = useState({
  id:details._id,
  patientName: details.patientName,
  age:details.age,
  gender:details.gender,
  address:details.address,
  email:details.email,
  phone:details.phone,
  profileImage: "",
})

//to hold image file data converted into url
const [preview, setPreview] = useState("");
//to convert image file to url
useEffect(() => {
  if (patientDetails.profileImage) {
    setPreview(URL.createObjectURL(patientDetails.profileImage));
  }
}, [patientDetails.profileImage]);


const updatePatient = async()=>{

  const {id,patientName,age,gender,address,email,phone,profileImage} = patientDetails;

  const reqBody= new FormData();
          reqBody.append("patientName", patientName);
          reqBody.append("age", age);
          reqBody.append("gender", gender);
          reqBody.append("address", address);
          reqBody.append("email", email);
          reqBody.append("phone", phone);
          preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",details.profileImage)

          //get Token
          const token = sessionStorage.getItem("token")
          console.log(token);
          if(token){
            const reqHeader = {
              "Content-Type":"multipart/form-data", // it indicates the request containes a image file
              "Authorization": `Bearer ${token}` //To send token from client side to server side
            }

            //api call
              const result = await updatePatientAPI(id,reqBody,reqHeader)
              console.log(result);
              if(result.status == 200){
                console.log(result.data);
                setUpdatePatientRes(result.data)
                alert("patient updated successfully")
              }
              else{
                console.log(result);
              }
          }

}

  return (
    <div>
      Patient Information
      <Container>
                  <Row>
                    
                    <Col md={12} className='d-flex justify-content-center'>
                      <label>
                        {" "}
                        <input
                          type="file"
                          style={{ display: "none" }}
                          className="form-field"
                          onChange={(e) =>
                            setPatientDetails({
                              ...patientDetails,
                              profileImage: e.target.files[0],
                            })
                          }
                        />{" "}
                        <img
                          src={preview?preview:`${baseUrl}/uploads/${details.profileImage}`}
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
                        value={patientDetails.patientName}
                        onChange={e=>setPatientDetails({...patientDetails,patientName:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Age"
                        className="w-100"
                        variant="outlined"
                        value={patientDetails.age}
                        onChange={e=>setPatientDetails({...patientDetails,age:e.target.value})}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col md={6}>
                      <TextField
                        id="outlined-select"
                        select
                        label="Gender"
                        defaultValue="" 
                        style={{ width: "100%" }}
                        value={patientDetails.gender}
                        onChange={e=>setPatientDetails({...patientDetails,gender:e.target.value})}
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
                        id="outlined-multiline"
                        multiline
                        rows={4}
                        label="Address"
                        className="w-100"
                        variant="outlined"
                        value={patientDetails.address}
                        onChange={e=>setPatientDetails({...patientDetails,address:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        className="w-100"
                        variant="outlined"
                        value={patientDetails.email}
                        onChange={e=>setPatientDetails({...patientDetails,email:e.target.value})}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-2 w-100"
                        variant="outlined"
                        value={patientDetails.phone}
                        onChange={e=>setPatientDetails({...patientDetails,phone:e.target.value})}
                      />
                    </Col>
                    <div className='text-center mt-4'>
                      <Button onClick={updatePatient} variant='outlined' className='w-100' color='success' >Update</Button>
                    </div>
                  </Row>
                </Container>

    </div>
  )
}

export default PatientInformation