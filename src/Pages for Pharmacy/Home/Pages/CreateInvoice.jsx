import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
  AllMedicineAPI,
  addInvoiceAPI,
  updateMedicineStockAPI,
  viewSingleMedicalRecordAPI,
} from "../../../Services/allAPIs";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddMedicineInvoice from "./Modals/AddMedicineInvoice";
import logo from '../../../Assets/logo.png'
import { addInvoiceContext } from "../../../ContextAPI/ContextShare";
import ViewInvoice from "./patientComponents/ViewInvoice";


function CreateInvoice({ onBack, recordId }) {
  const [singleRecord, setSingleRecord] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [success,setSuccess] =useState("")
  const {addInvoiceRes,setAddInvoiceRec} = useContext(addInvoiceContext)



  const handleBackClick = () => {
    if (onBack) {
      onBack();
      setSuccess("")
    }
  };

  // API call to fetch all reception
  const getSingleRecord = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await viewSingleMedicalRecordAPI(recordId, reqHeader);
        console.log(result.data);
        if (result.status == 200) {
          setSingleRecord(result.data);
        } else {
          alert("Failed to fetch record");
        }
      } catch (error) {
        console.error("Error fetching record:", error.message);
        alert("Error fetching record");
      }
    }
  };

  // API call to fetch medicine details
  const getMedicineDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await AllMedicineAPI(reqHeader); // Assuming you have an API function to fetch medicine details
        console.log(result);
        if (result.status === 200) {
          console.log(result);
          const availableMedicines = result.data.filter(medicine => medicine.stock > 0);
        setMedicines(availableMedicines);
        } else {
          alert("Failed to fetch medicine details");
        }
      } catch (error) {
        console.error("Error fetching medicine details:", error.message);
        alert("Error fetching medicine details");
      }
    }
  };

  useEffect(() => {
    getSingleRecord();
    getMedicineDetails();
  }, []);

  // Function to add additional medicine
  const handleAddMedicine = (medicine) => {
    // Update the singleRecord state with the new medicine
    setSingleRecord((prevRecord) => [
      ...prevRecord,
      {
        medicines: [medicine], // Wrap the new medicine in an array
      },
    ]);
  };


  const handleDeleteMedicine = (recordId, medicineId) => {
    // Update the singleRecord state to remove the medicine
    setSingleRecord(prevRecord =>
      prevRecord.map(record => ({
        ...record,
        medicines: record.medicines.filter(medicine => medicine.id !== medicineId)
      }))
    );
  };
  
  
  const handleSaveAndSend = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const allMedicines = singleRecord.flatMap((record) => record.medicines);
        const reqBody = {
          userId: singleRecord[0].userId,
          status: "pending",
          patientName: singleRecord[0].patientName,
          email: singleRecord[0].email,
          phone: singleRecord[0].phone,
          totalAmount: totalAmount,
          items: allMedicines.map((medicine) => ({
            ...medicine,
            quantity: medicine.days,
          })),
          note: "Thank you, Get well soon",
        };
        const result = await addInvoiceAPI(reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          // Update stock count for each medicine
          allMedicines.forEach(async (medicine) => {
            const updatedStockCount = medicine.stockCount - medicine.days;
            await updateMedicineStockAPI(medicine.id, updatedStockCount, reqHeader);
          });
          setAddInvoiceRec(result.data);
          setSuccess("true");
          alert("Invoice added successfully");
        } else {
          alert("Error adding invoice");
        }
      } catch (error) {
        console.error("Error saving invoice:", error.message);
        alert("Error saving invoice");
      }
    }
  };
 

  const totalAmount = singleRecord.reduce((acc, record) => {
    const totalMedicineAmount = record.medicines.reduce(
      (medicineAcc, medicine) => {
        return medicineAcc + medicine.price * medicine.days;
      },
      0
    );
    return acc + totalMedicineAmount;
  }, 0);

  return (
    <div>
   
      
          <Tooltip title="Go Back">
            <IconButton onClick={handleBackClick}>
              <ReplyOutlinedIcon />
            </IconButton>
          </Tooltip>{" "}
          &nbsp;{" "}
          <span style={{ fontSize: "20px", opacity: ".8" }}>
            {" "}
            {singleRecord.length > 0 ? singleRecord[0].patientName : ""}
          </span>
       
      {success ? ( // If addInvoiceRes is truthy, render the ViewInvoice component
        <ViewInvoice invoiceData={addInvoiceRes} />
      ) : (
      <Container className="card shadow" style={{ height: "100vh" }}>
        <img src={logo} alt="" className="mt-4" style={{width:'20%'}} />
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
                  {singleRecord.length > 0 ? singleRecord[0].patientName : ""}
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  {singleRecord.length > 0 ? singleRecord[0].email : ""}
                </span>
                <br />
                <span style={{ opacity: ".7", fontSize: "14px" }}>
                  {singleRecord.length > 0 ? singleRecord[0].phone : ""}
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
                    <th scope="col">Action</th>
                  </MDBTableHead>
                  <MDBTableBody>
                    {singleRecord.map((record, index) =>
                      record.medicines.map((medicine, medIndex) => (
                        <tr key={`${index}-${medIndex}`}>
                          <td>{medicine.name}</td>
                          <td>{medicine.price}</td>
                          <td>{medicine.days}</td>
                          <td>₹{medicine.price * medicine.days}</td>
                          <td>
                           
                            <IconButton
                              className="text-danger"
                              style={{ marginTop: "-10px" }}
                              aria-label="delete"
                              color="error"
                              onClick={() => {
                                console.log("Clicked Delete Button - Record ID:", record._id, "Medicine ID:", medicine._id);
                                handleDeleteMedicine(record._id, medicine.id);
                              }} 
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))
                    )}
                  
                    
                  </MDBTableBody>
                </MDBTable>
                <AddMedicineInvoice onAddMedicine={handleAddMedicine} item={medicines}/>
              </div>
            </Col>
            <Col md={4}>
              <div className="border rounded-3 p-3">
                Total Amount <br />
                <div className="d-flex justify-content-between mt-4">
                  <div>Total</div>
                  <div>₹{totalAmount}</div>
                </div>
                <label htmlFor="" className="mt-5">
                  Note
                </label>
                <TextField
                  id="outlined-multiline"
                  multiline
                  rows={4}
                  style={{ opacity: ".7" }}
                  value={"Thank you, Get well soon"}
                  className="w-100"
                  variant="outlined"
                />
              </div>

              <Button onClick={handleSaveAndSend} variant="outlined" className="mt-3 w-100" color="success">
                Save and Send
              </Button>
            </Col>
          </Row>
        </div>
       
      </Container>
      )}
    </div>
  );
}

export default CreateInvoice;
