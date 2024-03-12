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
import img from "../../../../Assets/user.png";
import emailjs from 'emailjs-com';
import { addAdminAPI} from "../../../../Services/allAPIs";
import { addAdminContext } from "../../../../ContextAPI/ContextShare";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddAdmin() {

    const [centredModal, setCentredModal] = useState(false);

    const [switchState, setSwitchState] = useState(false);
  
    const toggleOpen = () => setCentredModal(!centredModal);
    const toggleSwitch = () => setSwitchState(!switchState);
    //to hold token from session storage

    const {addAdminRes,setAddAdminRes} = useContext(addAdminContext)

  const [token, setToken] = useState("");
  //to get token fomr sessionstorage
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  //to hold project details from the form
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
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



//password
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

  const addAdmin = async () => {
    const generatedPassword = generatePassword();
    setAdminDetails(prev => ({ ...prev, password: generatedPassword }));
};

useEffect(() => {
    const submitAdmin = async () => {
        const { username, email, password, phone, age, gender, profile } = adminDetails;
        if (!username || !email || !password || !phone || !age || !gender || !profile) {
            // alert("Please fill in all fields");
            toast.error('"Please fill in all fields')
            return;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("profile", profile);

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await addAdminAPI(formData, reqHeader);
            console.log(response);
            if (response.status === 200) {
                setAddAdminRes(response.data);
                sendPasswordToEmail(response.data.email, response.data.password);
                // alert("Admin added successfully. Password sent to their email.");
                toast.success('Admin added successfully. Password sent to their email.')
                toggleOpen();
                setAdminDetails({
                    username: "",
                    email: "",
                    password: "",
                    phone: "",
                    age: "",
                    gender: "",
                    profile: "",
                });
                setPreview("");
            } else {
                alert(response.response.data);
            }
        } catch (error) {
            console.error("Error adding Admin:", error);
        }
    };

    if (adminDetails.password) {
        submitAdmin();
    }
}, [adminDetails]);

  const handleSave = () => {

    addAdmin();
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
              <MDBModalTitle>Add Admin</MDBModalTitle>
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
                <Button  onClick={handleSave} variant="outlined" color="success" className="w-100">
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

export default AddAdmin