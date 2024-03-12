import React, { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { addReceptionContextResponse } from "../../../../ContextAPI/ContextShare";
import { addReceptionAPI } from "../../../../Services/allAPIs";
import img from "../../../../Assets/user.png";
import emailjs from 'emailjs-com';

function AddReception() {
  const [centredModal, setCentredModal] = useState(false);

  const [switchState, setSwitchState] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleSwitch = () => setSwitchState(!switchState);

  const { addReceptionRes, setAddReceptionRes } = useContext(
    addReceptionContextResponse
  );

  //to hold token from session storage

  const [token, setToken] = useState("");
  //to get token fomr sessionstorage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  //to hold project details from the form
  const [receptionDetails, setReceptionDetails] = useState({
    receptionName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    profileImage: "",
  });

  //to hold image file data converted into url
  const [preview, setPreview] = useState("");
  //to convert image file to url
  useEffect(() => {
    if (receptionDetails.profileImage) {
      setPreview(URL.createObjectURL(receptionDetails.profileImage));
    }
  }, [receptionDetails.profileImage]);
 
  const generatePassword = () => {
    // Function to generate a random password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const sendPasswordToEmail = (email, password) => {
    const serviceID = 'service_0ztx2nx';
    const templateID = 'template_64edx2v';
    const userID = 'krgRjw9SKrpVrBsF5';
  
    // Send email with dynamic data
    emailjs.send(serviceID, templateID, {
      to_email: email,
      password: password
    }, userID)
    .then((response) => {
      console.log('Email sent:', response.status, response.text);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  const receptionAdd = async () => {
    const generatedPassword = generatePassword();
    setReceptionDetails((prevReceptionDetails) => ({
      ...prevReceptionDetails,
      password: generatedPassword,
    }));
  };

  useEffect(() => {
    const addReception = async () => {
      const {
        receptionName,
        email,
        password,
        phone,
        age,
        gender,
        address,
        profileImage,
      } = receptionDetails;
      if (
        !receptionName ||
        !email ||
        !password ||
        !phone ||
        !age ||
        !gender ||
        !address ||
        !profileImage
      ) {
        alert("Please fill the form");
        return;
      }

      const reqBody = new FormData();
      reqBody.append("receptionName", receptionName);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("phone", phone);
      reqBody.append("age", age);
      reqBody.append("gender", gender);
      reqBody.append("address", address);
      reqBody.append("profileImage", profileImage);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await addReceptionAPI(reqBody, reqHeader);
        if (result.status === 200) {
          setAddReceptionRes(result.data);
          sendPasswordToEmail(result.data.email, result.data.password);
          alert(
            "Receptionist added successfully and password successfully sent to their email"
          );
          toggleOpen();
          setReceptionDetails({
            receptionName: "",
            email: "",
            password: "",
            phone: "",
            age: "",
            gender: "",
            address: "",
            profileImage: "",
          });
          setPreview("");
        } else {
          alert(result.response.data);
        }
      } catch (error) {
        console.error("Error adding receptionist:", error);
      }
    };

    if (receptionDetails.password) {
      addReception();
    }
  }, [receptionDetails]);

  const handleSave = () => {
    
    // Proceed with adding receptionist
    receptionAdd();
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        className="floating-button"
        onClick={toggleOpen}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "70px",
          animation: "bounce 2s ease-in-out infinite", 
        }}
      >
        <AddIcon />
      </Fab>

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Receptionist</MDBModalTitle>
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
                            setReceptionDetails({
                              ...receptionDetails,
                              profileImage: e.target.files[0],
                            })
                          }
                        />{" "}
                        <img
                          src={preview ? preview : img}
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
                        value={receptionDetails.receptionName}
                        onChange={e=>setReceptionDetails({...receptionDetails,receptionName:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Age"
                        className="w-100"
                        variant="outlined"
                        value={receptionDetails.age}
                        onChange={e=>setReceptionDetails({...receptionDetails,age:e.target.value})}
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
                        value={receptionDetails.gender}
                        onChange={e=>setReceptionDetails({...receptionDetails,gender:e.target.value})}
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
                        value={receptionDetails.address}
                        onChange={e=>setReceptionDetails({...receptionDetails,address:e.target.value})}
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        className="w-100"
                        variant="outlined"
                        value={receptionDetails.email}
                        onChange={e=>setReceptionDetails({...receptionDetails,email:e.target.value})}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-2 w-100"
                        variant="outlined"
                        value={receptionDetails.phone}
                        onChange={e=>setReceptionDetails({...receptionDetails,phone:e.target.value})}
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
                <Button  onClick={handleSave} variant="outlined" color="success" className="w-100">
                  Save
                </Button>
              </div>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default AddReception;
