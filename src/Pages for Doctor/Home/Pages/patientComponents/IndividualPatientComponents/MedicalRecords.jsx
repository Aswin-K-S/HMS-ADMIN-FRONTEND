import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddMedicalRecord from "./AddMedicalRecord";
import { deleteRecordAPI, viewMedicalRecordAPI } from "../../../../../Services/allAPIs";
import { addmedicalRecordContext } from "../../../../../ContextAPI/ContextShare";
import ViewRecords from "../../Modals/ViewRecords";
import Tooltip from '@mui/material/Tooltip';

function MedicalRecords({ patientId }) {
  console.log(patientId);
  const [isPatientViewVisible, setIsPatientViewVisible] = useState(false); // State variable to track the visibility of PatientView
  const [selectedPatientId, setSelectedPatientId] = useState(patientId); // State variable to store the selected patient ID
  const [usermedicalrecord, setUserMedicalRecord] = useState([]);
  const { addRecordres, setAddRecordRes } = useContext(addmedicalRecordContext);
  // Function to handle the click event of the "View" button
  const handleViewClick = () => {
    console.log(patientId);
    setSelectedPatientId(patientId);
    console.log(selectedPatientId);
    setIsPatientViewVisible(true); // Set isPatientViewVisible to true when the button is clicked
  };

  const handleBack = () => {
    setIsPatientViewVisible(false);
    setSelectedPatientId(null); // Reset the selected patient ID
  };

  const getMedicalRecord = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await viewMedicalRecordAPI(patientId, reqHeader);
        console.log(result);
        if (result.status == 200) {
          setUserMedicalRecord(result.data);
          console.log(result.data);
        } else {
          alert("Failed to fetch records");
        }
      } catch (error) {
        console.error("Error fetching records:", error.message);
        alert("Error fetching records");
      }
    }
  };

  //delete
const deleteRecord = async (id) => {
  const token = sessionStorage.getItem('token')
  console.log(token);
  if(token){
    const reqHeader={
      "Authorization": `Bearer ${token}`
    }
console.log(reqHeader);
      try {         
          const result = await deleteRecordAPI(id, reqHeader);
          console.log(result);
          if (result.status == 200) {
              alert('record deleted successfully');
              getMedicalRecord();
          } else {
              alert('Failed to delete Record');
          }
      } catch (error) {
          console.error('Error deleting Record:', error);
          alert('Failed to delete Record');
      }
  }
};

  useEffect(() => {
    getMedicalRecord();
  }, [addRecordres]);

  return (
    <div>
      {!isPatientViewVisible && (
        <Container>
          <div className="d-flex justify-content-between ">
            <h5>Medical records</h5>
            <button onClick={handleViewClick} className="btn btn-success">
              New Record{" "}
            </button>
          </div>
          <Row className="mt-5">
            {usermedicalrecord.length > 0
              ? usermedicalrecord.map((record) => (
                  <Col key={record._id} lg={12} className="mb-4">
                    <div
                      className="shadow-3"
                      style={{
                        backgroundColor: "#F8F9FA",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Container>
                        <Row>
                          <Col md={2}>
                            <p style={{ opacity: ".6" }}>
                              {new Date(record.date).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                              })}
                            </p>
                          </Col>
                          <Col md={8} style={{ overflow: "hidden" }}>
                            <p>
                              Complaint: <span>{record.complaints}</span>
                            </p>
                            <p>
                             
                            </p>
                            <p>
                              Prescription:{" "}
                              <span>
                                {record.medicines
                                  .map((medicine) => medicine.name)
                                  .join(", ")}
                              </span>
                            </p>
                          </Col>
                          <Col md={2}>
                            <div className="d-flex">
                              <ViewRecords details={record} />
                              <Tooltip title="Delete">
                                <IconButton
                                onClick={() => deleteRecord(record._id)}
                                >
                                  <DeleteIcon className=" text-danger" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Col>
                ))
              : "No records"}
          </Row>
        </Container>
      )}
      {/* Render the PatientView component if isPatientViewVisible is true */}
      {isPatientViewVisible && (
        <AddMedicalRecord patientId={selectedPatientId} onBack={handleBack} />
      )}
    </div>
  );
}

export default MedicalRecords;
