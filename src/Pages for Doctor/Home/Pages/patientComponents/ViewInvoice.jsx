import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import logo from "../../../../Assets/logo.png";
import GeneratePayment from "../Modals/GeneratePayment";

function ViewInvoice({ invoiceData }) {
  console.log(invoiceData);

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  const containerRef = useRef(null);

  const handlePrint = () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const container = containerRef.current;

    html2canvas(container, {
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 20, 20, 550, 0);
      pdf.save("invoice.pdf");
     
    });
  };

  return (
    <div>
        <div className="d-flex justify-content-between">
        <div></div>
        <div className="mb-3 d-flex">
            <Button variant="outlined" color="success" className="me-3" onClick={handlePrint}>Print <LocalPrintshopOutlinedIcon className="ms-1" style={{fontSize:'15px'}}/></Button>  
             <GeneratePayment details={invoiceData}/>
             </div>
             </div>
             <div ref={containerRef}>
      <Container className="card shadow" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-between">
          <img src={logo} alt="" className="mt-4" style={{ width: "20%" }} />
          <span className="mt-3 me-1">
            Date:{new Date(invoiceData.updatedAt).toLocaleString("en-IN")}
          </span>
        </div>
        <div>
          <Row className="ms-1 mt-3">
            <Col md={6}>
              <div className="border rounded-3 p-3">
                <span style={{ fontWeight: "600" }}>From:</span> <br />
                <br />
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  CareWave
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  carewave@gmail.com
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  9867343276
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div className="border rounded-3 p-3">
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "600" }}>To:</span>
                </div>
                <br />
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  {invoiceData.patientName}
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  {invoiceData.email}
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  {invoiceData.phone}
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={8}>
              <div className="border rounded-3 p-3">
                <MDBTable hover>
                  <MDBTableHead className="bg-body-secondary">
                    <th scope="col">Item</th>
                    <th scope="col">Item Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                   
                  </MDBTableHead>
                  <MDBTableBody>
                    {invoiceData.items &&
                      invoiceData.items.map((medicine) => (
                        <tr key={medicine.id}>
                          <td>{medicine.name}</td>
                          <td>{medicine.price}</td>
                          <td>{medicine.quantity}</td>
                          <td>₹{medicine.price * medicine.quantity}</td>
                         
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </Col>
            <Col md={4}>
              <div className="border rounded-3 p-3">
                Total Amount <br />
                <div className="d-flex justify-content-between mt-4">
                  <div>Total</div>
                  <div>₹{invoiceData.totalAmount}</div>
                </div>
                <label htmlFor="" className="mt-5">
                  Note
                </label>
                <TextField
                  id="outlined-multiline"
                  multiline
                  rows={4}
                  style={{ opacity: ".7" }}
                  value={invoiceData.note}
                  className="w-100"
                  variant="outlined"
                  inputProps={{ readOnly: true }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      </div>
    </div>
  );
}

export default ViewInvoice;
