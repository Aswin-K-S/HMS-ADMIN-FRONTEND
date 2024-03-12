import React, { useContext, useEffect, useState } from 'react'
import { updateAdminContext } from '../../../../ContextAPI/ContextShare';
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { baseUrl } from '../../../../Services/baseUrl';
import MenuItem from "@mui/material/MenuItem";
import { updateAdminAPI } from '../../../../Services/allAPIs';
import Button from "@mui/material/Button";
function AdminInformation({admindet}) {
console.log(admindet);
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
            alert("Admin updated successfully")
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
                    <span className="text-center mb-2">Profile Image</span>
                    <Col md={12}>
                      <label className='d-flex justify-content-center'>
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
                    <span className="mt-3 mb-3 text-center">Personal Details</span>
                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Full Name"
                        className="w-100"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        style={{ width: "100%" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                    <span className="mt-3 mb-3 text-center">Contact Details</span>
                    <Col md={6}>
                    <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-2 w-100"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={adminDetails.email}
                        onChange={e=>setAdminDetails({...adminDetails,email:e.target.value})}
                      />
                    
                    </Col>
                    <div className="col-6 mt-4 text-center w-100">
                        <Button  onClick={updateAdmin} variant="outlined" color="success" className="w-100">
                        Update
                        </Button>
                    </div>
                  </Row>
                </Container>

    </div>
  )
}

export default AdminInformation