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
import { updateReceptionAPI } from "../../../../Services/allAPIs";
import { updateReceptionContextResponse } from "../../../../ContextAPI/ContextShare";

function EditReceptionDet({ recepdet }) {
 
  const [centredModal, setCentredModal] = useState(false);

  const [switchState, setSwitchState] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleSwitch = () => setSwitchState(!switchState);

  const {updateReceptionRes,setUpdateReceptionRes} = useContext(updateReceptionContextResponse)

  const [receptionDetails, setReceptionDetails] = useState({
    id:recepdet._id,
    receptionName: recepdet.receptionName,
    email: recepdet.email,
    password: recepdet.password,
    phone: recepdet.phone,
    age: recepdet.age,
    gender: recepdet.gender,
    address: recepdet.address,
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

  const updateReception = async () => {
    const {
      id,
      receptionName,
      email,
      password,
      phone,
      age,
      gender,
      address,
      profileImage,
    } = receptionDetails;

        const reqBody = new FormData();
        reqBody.append("receptionName", receptionName);
        reqBody.append("email", email);
        reqBody.append("password", password);
        reqBody.append("phone", phone);
        reqBody.append("age", age);
        reqBody.append("gender", gender);
        reqBody.append("address", address);
        preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",recepdet.profileImage)

        //get Token
        const token = sessionStorage.getItem("token")
        console.log(token);
        if(token){
          const reqHeader = {
            "Content-Type":"multipart/form-data", // it indicates the request containes a image file
            "Authorization": `Bearer ${token}` //To send token from client side to server side
          }

          //api call
          const result = await updateReceptionAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status == 200){
            console.log(result.data);
           setUpdateReceptionRes(result.data)
            alert("Reception updated successfully")
            toggleOpen();

        
          }
          else{
            console.log(result);
          }

    
        }
 
  }

  return (
    <div>
      <CreateOutlined onClick={toggleOpen} color="primary" />

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
                          src={preview?preview:`${baseUrl}/uploads/${recepdet.profileImage}`}
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                          }}
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
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            receptionName: e.target.value,
                          })
                        }
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Age"
                        className="w-100"
                        variant="outlined"
                        value={receptionDetails.age}
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            age: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            gender: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            address: e.target.value,
                          })
                        }
                      />
                    </Col>

                    <Col md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        className="w-100"
                        variant="outlined"
                        value={receptionDetails.email}
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            email: e.target.value,
                          })
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Phone No"
                        className="mt-2 w-100"
                        variant="outlined"
                        value={receptionDetails.phone}
                        onChange={(e) =>
                          setReceptionDetails({
                            ...receptionDetails,
                            phone: e.target.value,
                          })
                        }
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
                <Button
                 onClick={updateReception}
                  variant="outlined"
                  color="success"
                  className="w-100"
                >
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

export default EditReceptionDet;
