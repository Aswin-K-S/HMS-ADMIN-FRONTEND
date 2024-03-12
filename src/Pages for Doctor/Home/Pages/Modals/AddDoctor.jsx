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
import { addDoctorContextResponse } from "../../../../ContextAPI/ContextShare";
import img from "../../../../Assets/user.png";
import emailjs from "emailjs-com";
import { addDoctorAPI } from "../../../../Services/allAPIs";

function AddDoctor() {
  const [centredModal, setCentredModal] = useState(false);

  const [switchState, setSwitchState] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleSwitch = () => setSwitchState(!switchState);

  const { addDoctorRes, setAddDoctorRes } = useContext(
    addDoctorContextResponse
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
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "",
    specialization: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    status: "",
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

  const generatePassword = () => {
    // Function to generate a random password
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const passwordLength = 8;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  const sendPasswordToEmail = (email, password) => {
    const serviceID = "service_0ztx2nx";
    const templateID = "template_64edx2v";
    const userID = "krgRjw9SKrpVrBsF5";

    // Send email with dynamic data
    emailjs
      .send(
        serviceID,
        templateID,
        {
          to_email: email,
          password: password,
        },
        userID
      )
      .then((response) => {
        console.log("Email sent:", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const doctorAdd = async () => {
    const generatedPassword = generatePassword();
    setDoctorDetails((prevDoctorDetails) => ({
      ...prevDoctorDetails,
      password: generatedPassword,
    }));
  };

  useEffect(() => {
    const addDoctor = async () => {
      const {
        doctorName,
        specialization,
        email,
        password,
        phone,
        age,
        gender,
        address,
        status,
        profileImage,
      } = doctorDetails;
      if (
        !doctorName ||
        !specialization ||
        !email ||
        !password ||
        !phone ||
        !age ||
        !gender ||
        !address ||
        !status ||
        !profileImage
      ) {
        alert("please fill the form");
        return;
      }

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
      reqBody.append("profileImage", profileImage);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await addDoctorAPI(reqBody, reqHeader);
        if (result.status === 200) {
          setAddDoctorRes(result.data);
          sendPasswordToEmail(result.data.email, result.data.password);
          alert("Doctor added successfully and password successfully sent to their email");
          toggleOpen();
          setDoctorDetails({
            doctorName: "",
            specialization: "",
            email: "",
            password: "",
            phone: "",
            age: "",
            gender: "",
            address: "",
            status: "",
            profileImage: "",
          });
          setPreview("");
        } else {
          alert(result.response.data);
        }
      } catch (error) {
        console.error("Error adding doctor:", error);
      }
    };

    if (doctorDetails.password) {
      addDoctor();
    }
  }, [doctorDetails]);

  const handleSave = () => {
   
    doctorAdd();
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
          animation: "bounce 2s ease-in-out infinite", // Add the desired animation here
        }}
      >
        <AddIcon />
      </Fab>

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
                <Button onClick={handleSave} variant="outlined" color="success" className="w-100">
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

export default AddDoctor;
