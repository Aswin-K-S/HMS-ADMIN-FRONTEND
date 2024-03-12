import React, { useContext, useEffect, useState } from 'react'
import {  updateDoctorContextResponse } from '../../../../ContextAPI/ContextShare';
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { baseUrl } from '../../../../Services/baseUrl';
import MenuItem from "@mui/material/MenuItem";
import {  updateDoctorAPI } from '../../../../Services/allAPIs';
import Button from "@mui/material/Button";
function PersonalInfo({docdet}) {
console.log(docdet);
    const {updateDoctorRes,setUpdateDoctorRes} = useContext(updateDoctorContextResponse)

    //to hold token from session storage
    const [token, setToken] = useState("");
    //to get token fomr sessionstorage
    useEffect(() => {
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"));
      }
    }, []);

    const [doctorDetails, setDoctorDetails] = useState({
      id:docdet._id,
      specialization: docdet.specialization,
      doctorName: docdet.doctorName,
      email: docdet.email,
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
          phone,
          age,
          gender,
          address,
          status,
          profileImage,
        } = doctorDetails;
    
            const reqBody = new FormData();
            reqBody.append("doctorName", doctorName);
            reqBody.append("specialization", specialization);
            reqBody.append("email", email);
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
    
            
              }
              else{
                console.log(result);
              }
    
            //}
            }
     
      }

  return (
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
                    <div className="col-6 mt-4 text-center w-100">
                        <Button  onClick={updateDoctor} variant="outlined" color="success" className="w-100">
                        Update
                        </Button>
                    </div>
                  </Row>
                </Container>
    </div>
  )
}

export default PersonalInfo