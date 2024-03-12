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
import { addAppointmentAPI, allDoctorAPI, allPatientAPI } from "../../../../Services/allAPIs";
import {addAppointmentContext, addPatientContextResponse} from '../../../../ContextAPI/ContextShare'
import {addDoctorContextResponse} from '../../../../ContextAPI/ContextShare'
import emailjs from "emailjs-com";

function AddAppointments() {
    const [centredModal, setCentredModal] = useState(false);

    const [switchState, setSwitchState] = useState(false);
  
    const toggleOpen = () => setCentredModal(!centredModal);
    const toggleSwitch = () => setSwitchState(!switchState);

    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dateOfVisit, setDateOfVisit] = useState('');
    const [description, setDescription] = useState('');

    const {addPatientRes,setAddPatientRes} = useContext(addPatientContextResponse)
    const  [allPatient,setAllPatient] = useState([])
    const [allDoctor, setAllDoctor] = useState([]);
    const {addDoctorRes,setAddDoctorRes} = useContext(addDoctorContextResponse)
    const {addAppointmentRes,setAddAppointmentRes} = useContext(addAppointmentContext)

    const [token, setToken] = useState("");

   

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

     // API call to fetch all reception
const getAllPatient = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
    
      try {
        const result = await allPatientAPI(reqHeader);
        if (result.status === 200) {
          result.data.forEach(patient => {
            let utcDate = new Date(patient.date);
            patient.date = utcDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
          });
          setAllPatient(result.data);
          console.log(result.data);
        } else {
          alert('Failed to fetch Patient');
        }
      } catch (error) {
        console.error('Error fetching Patient:', error.message);
        alert('Error fetching Patient');
      }
    }
    };

    // API call to fetch all reception
const getAllDoctor = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
      };
    
      try {
        const result = await allDoctorAPI(reqHeader);
        if (result.status === 200) {
          setAllDoctor(result.data);
          console.log(result.data);
        } else {
          alert('Failed to fetch Doctor');
        }
      } catch (error) {
        console.error('Error fetching Doctor:', error.message);
        alert('Error fetching Doctor');
      }
    }
    };

    useEffect(()=>{
        getAllPatient()
        getAllDoctor()
      },[addPatientRes,addDoctorRes])


 
  const handleSaveAppointment = async () => {
    try {
  
      if (!selectedPatient || !selectedDoctor || !startTime || !endTime || !dateOfVisit) {
        alert('Please fill all required fields');
        return;
      }

     

      const reqBody = {
        dateOfVisit,
        startTime,
        endTime,
        patientId: selectedPatient,
        doctorId: selectedDoctor,
        description,
        status:'pending'
      };

      const reqHeader = {
        "Authorization": `Bearer ${token}`,
      };
  

      const result = await addAppointmentAPI(reqBody,reqHeader);
      console.log(result);
      // Check if the appointment was saved successfully
      if (result.status === 200) {
        console.log(result);
        setAddAppointmentRes(result.data)
        alert("Successfully booked an appointment")
        handleSendMail(result.data.patientName,result.data.doctorName,result.data.patientEmail)
        // Reset form fields
        setSelectedPatient('');
        setSelectedDoctor('');
        setStartTime('');
        setEndTime('');
        setDateOfVisit('');
        setDescription('');

        toggleOpen();


      } else {
        alert('Failed to save the appointment');
      }
    } catch (error) {
      console.error('Error saving appointment:', error.message);
      alert('Error saving appointment');
    }
  };


  const handleSendMail = (patientName,doctorName,patientEmail) => {
    const serviceID = "service_0ztx2nx";
    const templateID = "template_n1xfsog";
    const userID = "krgRjw9SKrpVrBsF5";

    const visitDate = new Date(dateOfVisit);
    const appointmentDate = visitDate.toDateString();
    // Send email with dynamic data
    emailjs
      .send(
        serviceID,
        templateID,
        {
          to_email: patientEmail, 
          from_name: 'CareWave',
          appointment_date: appointmentDate,
          doctor_name: doctorName, 
          patient_name: patientName
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
              <MDBModalTitle>New Appointment</MDBModalTitle>
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
                   
                    <Col md={12} className="mb-4">
                    <TextField
                        id="outlined-select"
                        select
                        label="Patient"
                        defaultValue="" // Set an initial value or remove this line
                        style={{ width: "100%" }}
                        value={selectedPatient}
                      onChange={(e) => setSelectedPatient(e.target.value)}
                      >
                        {allPatient.map(item=>(
                        <MenuItem key={item._id} value={item._id}>{item.patientName}</MenuItem>
                        ))}
                      </TextField>
                    </Col>
                  </Row>
                  <Row>
                    
                    <Col md={12} >
                    <label >Date Of Visit</label>
                      <TextField
                        id="outlined-basic"
                        type="Date"
                        className="w-100"
                        variant="outlined"
                        style={{ width: "100%" }}  
                        value={dateOfVisit}
                      onChange={(e) => setDateOfVisit(e.target.value)}
                      />
                    </Col>

                 
                  </Row>
                  <Row className="mt-4">
                    <Col md={6}>
                        <label htmlFor="">Start Time</label>
                    <TextField
                        id="outlined-basic"
                        type="time"
                        className="w-100"
                        variant="outlined"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                    </Col>

                    <Col md={6}>
                        <label htmlFor="">End Time</label>
                      <TextField
                        id="outlined-basic"
                        type="time"
                        className="w-100"
                        variant="outlined"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col md={12}>
                    <TextField
                        id="outlined-select"
                        select
                        label="Doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        style={{ width: "100%" }}
                      
                      >
                       {allDoctor.map(item=>(
                        <MenuItem key={item._id} value={item._id}>{item.doctorName}</MenuItem>
                        ))}
                      </TextField>
                      </Col>
                      
                </Row>
                <Row className="mt-4">
                    <Col md={12}>
                    <TextField
                        id="outlined-multiline"
                        multiline
                        rows={4}
                        label="Description"
                        className="w-100"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                <Button onClick={handleSaveAppointment} variant="outlined" color="success" className="w-100">
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

export default AddAppointments