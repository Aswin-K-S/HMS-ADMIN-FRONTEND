import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { viewAllSingleInvoiceAPI } from "../../../../../Services/allAPIs";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ViewInvoicewithback from "../ViewInvoicewithback";
import Tooltip from "@mui/material/Tooltip";
import PatientViewInvoice from "./PatientViewInvoice";


function PatientInvoices({patientId }) {
  const [isPatientViewVisible, setIsPatientViewVisible] = useState(false);
  console.log(patientId);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [invoiceData,setInvoiceData] = useState([])

  const handleViewClick = (id) => {
    console.log(id);
    setSelectedPatientId(id);
    setIsPatientViewVisible(true);
  };

  const handleBack = () => {
    setIsPatientViewVisible(false);
    setSelectedPatientId(null); // Reset the selected patient ID
  };



  const GetSingleInvoice = async()=>{
    const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const result = await viewAllSingleInvoiceAPI(patientId, reqHeader);
          console.log(result);
          if (result.status == 200) {
            setInvoiceData(result.data);
          } else {
            alert("Failed to fetch record");
          }
        } catch (error) {
          console.error("Error fetching record:", error.message);
          alert("Error fetching record");
        }

      }
  }

useEffect(()=>{
  GetSingleInvoice()
},[])


  return (
    <div>
       {!isPatientViewVisible && (
       <Container>
        <div className='d-flex justify-content-between '>
          <h5>Medical records</h5>
         
        </div>
        <Row className='mt-5'>
        {invoiceData.map(item => (
              <Col lg={12} className='mb-4'>
                <div className='shadow-3' style={{ backgroundColor:'#F8F9FA', padding:'10px', borderRadius:'10px' }}>
                  <Container>
                    <Row>
                      <Col md={2}>
                        Created At
                        <p style={{ opacity:'.6' }}>
                          {new Date(item.updatedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                        </p>
                      </Col>
                      <Col md={8} style={{ overflow:'hidden' }}>
                        <p>Patient Name: <span className='ms-2' style={{fontWeight:'600',fontSize:'18px'}}> {item.patientName}</span></p>
                        <p>Total Amount: <span className='ms-2' style={{fontWeight:'600',fontSize:'18px'}}>{item.totalAmount}</span></p>
                        <p>Status:{item.status=="Pending"?<span className='ms-2' style={{fontWeight:'600',fontSize:'18px',color:'#d4de10'}}>{item.status}</span>:<span className='ms-2' style={{fontWeight:'600',fontSize:'18px',color:'green'}}>{item.status}</span>} </p>
                      </Col>
                      <Col md={2}>
                        <div className='d-flex'>
                         
                        <Tooltip title="View">
                                <IconButton>
                                  <RemoveRedEyeOutlinedIcon
                                     onClick={() => handleViewClick(item._id)}
                                    className="text-primary"
                                  />
                                </IconButton>
                              </Tooltip>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
        ))}
        </Row>
      </Container>
       )}
       {isPatientViewVisible && (
        <PatientViewInvoice
          invoiceData={invoiceData.find(
            (item) => item._id === selectedPatientId
          )}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default PatientInvoices;
