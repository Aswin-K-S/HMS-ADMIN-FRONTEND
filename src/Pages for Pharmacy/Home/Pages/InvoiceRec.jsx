import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteInvoiceAPI, viewAllRecordAPI } from "../../../Services/allAPIs";
import CreateInvoice from "./CreateInvoice";

function InvoiceRec() {
  const [isPatientViewVisible, setIsPatientViewVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [allrecords, setAllrecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("today");
  const [selectedDate, setSelectedDate] = useState("");

  const handleViewClick = (id) => {
    console.log(id);
    setSelectedPatientId(id);
    setIsPatientViewVisible(true);
  };

  const handleBack = () => {
    setIsPatientViewVisible(false);
    setSelectedPatientId(null); // Reset the selected patient ID
  };

  // API call to fetch all medicines
  const getAllRecords = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await viewAllRecordAPI(reqHeader);
        console.log(result);
        if (result.status === 200) {
          setAllrecords(result.data);
        } else {
          alert("Failed to fetch medicines");
        }
      } catch (error) {
        console.error("Error fetching medicines:", error.message);
        alert("Error fetching medicines");
      }
    }
  };

  useEffect(() => {
    getAllRecords();
  }, []);


  const deleteInvoice = async (id) => {
  
    const token = sessionStorage.getItem('token')
    console.log(token);
    if(token){
      const reqHeader={
        "Authorization": `Bearer ${token}`
      }
  console.log(reqHeader);
        try {         
            const result = await deleteInvoiceAPI(id, reqHeader);
            console.log(result);
            if (result.status == 200) {
                alert('Invoice deleted successfully');
                getAllRecords();
            } else {
                alert('Failed to delete medicine');
            }
        } catch (error) {
            console.error('Error deleting Medicine:', error);
            alert('Failed to delete medicine');
        }
    }
  };


  // Filter records based on search query, status, and date
  const filteredRecords = allrecords
    .filter((record) => {
      const isToday =
        new Date(record.date).toDateString() === new Date().toDateString();
      return (
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedStatus === "all" ||
          (selectedStatus === "today" && isToday) ||
          record.status === selectedStatus) &&
        (selectedDate === "" || record.date.includes(selectedDate))
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {!isPatientViewVisible && (
        <Container fluid>
          <Row className="mt-4">
            <Col md={12}>
              <h1 className="text-center">Request</h1>
              <div className="card" style={{ height: "auto" }}>
                <div className="card-body">
                  <div>
                    <Row>
                      <Col md={3}>
                        <TextField
                          id="outlined-search"
                          label="Search field"
                          style={{ width: "100%", backgroundColor: "#F8F9FA" }}
                          type="search"
                          alue={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <TextField
                          id="outlined-select"
                          select
                          label="Status"
                          defaultValue="today" // Set an initial value or remove this line
                          style={{ width: "100%", backgroundColor: "#F8F9FA" }}
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <MenuItem value="today">Today</MenuItem>
                          <MenuItem value="all">All</MenuItem>
                        </TextField>
                      </Col>
                      <Col md={3}></Col>
                      <Col md={3}>
                       
                      </Col>
                    </Row>
                    <MDBTable align="middle" className="mt-4" hover>
                      <MDBTableHead>
                        <tr>
                          <th scope="col">S.no</th>
                          <th scope="col">Patient</th>
                          <th scope="col">Date</th>

                          <th scope="col">Action</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {filteredRecords.map((record, index) => (
                          <tr key={record.id}>
                            <td>#{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">
                                    {record.patientName}
                                  </p>
                                  <p className="text-muted mb-0">
                                    {record.phone}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="fw-normal mb-1">
                                {new Date(record.date).toLocaleString("en-IN")}
                              </p>
                            </td>

                            <td>
                              <Tooltip title="View">
                                <IconButton>
                                  <RemoveRedEyeOutlinedIcon
                                    onClick={() => handleViewClick(record._id)}
                                    className="text-primary"
                                  />
                                </IconButton>
                              </Tooltip>
                             
                            </td>
                          </tr>
                        ))}
                      </MDBTableBody>
                    </MDBTable>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      {isPatientViewVisible && (
        <CreateInvoice recordId={selectedPatientId} onBack={handleBack} />
      )}
    </div>
  );
}

export default InvoiceRec;
