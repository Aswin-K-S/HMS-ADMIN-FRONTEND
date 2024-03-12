import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Col, Container, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function ViewRecords({details}) {

  console.log(details);

  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);

  return (
    <div>
      <Tooltip title="View">
        <IconButton onClick={toggleOpen}>
          <RemoveRedEyeOutlinedIcon
          
            className="text-primary"
          />
        </IconButton>
      </Tooltip>

     

<MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
  <MDBModalDialog size="xl" centered>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle className=""><div>Doctor: {details.doctorName}</div><div>{new Date(details.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div></MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody >
        <Container>
          <Row className="mt-4">
            <Col md={4}>
              <h5 style={{fontSize:'16px'}}>Complaint</h5>
            </Col>
            <Col md={8}>
              <TextField  id="outlined-multiline" value={details.complaints} multiline maxRows={4} variant="outlined" className="w-100"></TextField>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4}>
              <h5 style={{fontSize:'16px'}}>Diagnosis</h5>
            </Col>
            <Col md={8}>
              <TextField  id="outlined-multiline" value={details.diagnosis} multiline maxRows={4} variant="outlined" className="w-100"></TextField>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4}>
              <h5 style={{fontSize:'16px'}}>Vital Signs</h5>
            </Col>
            <Col md={8}>
              <TextField  id="outlined-multiline" value={details.vitalSigns} multiline maxRows={4} variant="outlined" className="w-100"></TextField>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4}>
              <h5 style={{fontSize:'16px'}}>Notes</h5>
            </Col>
            <Col md={8}>
              <TextField  id="outlined-multiline" value={details.notes} multiline maxRows={4} variant="outlined" className="w-100"></TextField>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={4}>
              <h5 style={{fontSize:'16px'}}>Prescription</h5>
            </Col>
            <Col md={8}>
              <div className="text-center d-flex justify-content-center  border rounded-2">
             
              <MDBTable hover className="w-100 m-2">
                <MDBTableHead className="bg-body-secondary" style={{width:'200px'}}>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Dosage Quantity</th>
                    <th scope="col">Dosage Timings</th>
                    <th scope="col">Instruction</th>
                    <th scope="col">Quantity</th>
                   
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {details.medicines?details.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{medicine.name}</td>
                      <td>{medicine.dosageQuantity}</td>
                      <td>{medicine.dosageTimings}</td>
                      <td>{medicine.instructions}</td>
                      <td>{medicine.days}</td>
                      
                    </tr>
                  )):"Empty"
                  }
                </MDBTableBody>
              </MDBTable>
        
              </div>
            </Col>
          </Row>
        </Container>


      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={toggleOpen}>
          Close
        </MDBBtn>
       
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

    </div>
  );
}

export default ViewRecords;
