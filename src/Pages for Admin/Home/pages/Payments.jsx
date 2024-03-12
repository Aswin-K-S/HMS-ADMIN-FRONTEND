import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
import { deletePaymentAPI, getAllPaymentAPI } from "../../../Services/allAPIs";
import { updateInvoiceContext } from "../../../ContextAPI/ContextShare";
import { CSVLink,CSVDownload } from 'react-csv';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';

function Payments() {
  const [allPayment, setAllPayment] = useState([]);
  const { updateInvoiceRes, setUpdateInvoiceRes } =
    useContext(updateInvoiceContext);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortByPaymentMethod, setSortByPaymentMethod] = useState("");
  const [csvData, setCsvData] = useState(null);
  const [todayPaymentsTotal, setTodayPaymentsTotal] = useState(0);
  const [monthlyPaymentsTotal, setMonthlyPaymentsTotal] = useState(0);
  const [yearlyPaymentsTotal, setYearlyPaymentsTotal] = useState(0);

  // API call to fetch all medicines
  const getAllPayment = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getAllPaymentAPI(reqHeader);
        console.log(result);
        if (result.status === 200) {
          setAllPayment(result.data);
        } else {
          alert("Failed to fetch payment");
        }
      } catch (error) {
        console.error("Error fetching payment:", error.message);
        alert("Error fetching payment");
      }
    }
  };

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const todayPayments = allPayment.filter((payment) => {
      const paymentDate = new Date(payment.updatedAt);
      return (
        paymentDate.getDate() === today.getDate() &&
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getFullYear() === currentYear
      );
    });
    const monthlyPayments = allPayment.filter((payment) => {
      const paymentDate = new Date(payment.updatedAt);
      return (
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getFullYear() === currentYear
      );
    });
    const yearlyPayments = allPayment.filter((payment) => {
      const paymentDate = new Date(payment.updatedAt);
      return paymentDate.getFullYear() === currentYear;
    });

    // Calculate totals
    const calculateTotal = (payments) => {
      return payments.reduce(
        (total, payment) => total + payment.totalAmount,
        0
      );
    };

    setTodayPaymentsTotal(calculateTotal(todayPayments));
    setMonthlyPaymentsTotal(calculateTotal(monthlyPayments));
    setYearlyPaymentsTotal(calculateTotal(yearlyPayments));
  }, [allPayment, updateInvoiceRes]);

  const deletePayment = async (id) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      console.log(reqHeader);
      try {
        const result = await deletePaymentAPI(id, reqHeader);
        console.log(result);
        if (result.status == 200) {
          alert("Payment deleted successfully");
          getAllPayment();
        } else {
          alert("Failed to delete Payment");
        }
      } catch (error) {
        console.error("Error deleting Payment:", error);
        alert("Failed to delete Payment");
      }
    }
  };

  useEffect(() => {
    getAllPayment();
  }, [updateInvoiceRes]);

  // Filter payments based on search keyword and payment method
  const filteredPayments = allPayment
    .filter((payment) => {
      const isNameMatch =
        payment.patientName
          .toLowerCase()
          .includes(searchKeyword.toLowerCase()) ||
        payment.paymentMethod
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());

      if (sortByPaymentMethod === "") {
        return isNameMatch; // Return true if the name matches and no specific payment method is selected
      } else if (sortByPaymentMethod === "All") {
        return isNameMatch; // Return true if the name matches regardless of payment method when "All" is selected
      } else {
        return (
          isNameMatch &&
          payment.paymentMethod.toLowerCase() ===
            sortByPaymentMethod.toLowerCase()
        ); // Return true only if the name matches and the payment method matches the selected filter
      }
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));


    const exportData = () => {
      const dataToExport = filteredPayments.map((payments) => ({
        Patient: payments.patientName,
        Phone:payments.phone,
        Date: payments.createdAt,
        Status: payments.status,
        Amount: payments.totalAmount,
        Email: payments.email,
        Payment_Method: payments.paymentMethod,
      }));
      setCsvData(dataToExport);
      // Reset csvData after a short delay to allow time for download
      setTimeout(() => {
        setCsvData(null);
      }, 1000);
    };

  return (
    <div>
      Payments <br />
      <br />
      <Container fluid>
        <Row>
          <Col md={4}>
            <div className="card" style={{ height: "147px" }}>
              <div className="card-body">
                Today Payments <br />
                <br />
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "500", fontSize: "20px" }}>
                    {todayPaymentsTotal}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#708BB8",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    <AccessTimeIcon style={{ color: "white" }} />
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card" style={{ height: "147px" }}>
              <div className="card-body">
                Monthly Payments <br /> <br />
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "500", fontSize: "20px" }}>
                    {monthlyPaymentsTotal}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#F97315",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    <DateRangeIcon style={{ color: "white" }} />
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="card" style={{ height: "147px" }}>
              <div className="card-body">
                Yearly Payments <br /> <br />
                <div className="d-flex justify-content-between">
                  <span style={{ fontWeight: "500", fontSize: "20px" }}>
                    {yearlyPaymentsTotal}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#22C55D",
                      padding: "5px",
                      borderRadius: "8px",
                    }}
                  >
                    <CalendarMonthIcon style={{ color: "white" }} />
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
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
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                      <TextField
                        id="outlined-select"
                        select
                        label="Payment Method"
                        defaultValue="" // Set an initial value or remove this line
                        style={{ width: "100%", backgroundColor: "#F8F9FA" }}
                        value={sortByPaymentMethod}
                        onChange={(e) => setSortByPaymentMethod(e.target.value)}
                      >
                        {" "}
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="card">Card</MenuItem>
                        <MenuItem value="Vidal Insurance">
                          Vidal Insurance
                        </MenuItem>
                        <MenuItem value="NHCF Insurance">
                          NHCF Insurance
                        </MenuItem>
                      </TextField>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={3}>
                      <Button
                        onClick={exportData}
                        variant="contained"
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#708BB8",
                        }}
                      >
                        Export &nbsp; <CloudDownloadOutlinedIcon />
                      </Button>
                      {csvData && (
                        <CSVDownload data={csvData} target="_blank" />
                      )}
                    </Col>
                  </Row>
                  <MDBTable align="middle" className="mt-4" hover>
                    <MDBTableHead>
                      <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Method</th>
                        <th scope="col">Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {filteredPayments.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-3">
                                <p className="fw-bold mb-1">
                                  {item.patientName}
                                </p>
                                <p className="text-muted mb-0">{item.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="fw-normal mb-1">
                              {" "}
                              {new Date(item.updatedAt).toLocaleString("en-IN")}
                            </p>
                          </td>
                          <td>
                            <MDBBadge
                              color="subtle"
                              className="pt-1 pb-1"
                              style={{
                                width: "65px",
                                fontWeight: "normal",
                                fontSize: "12px",
                                backgroundColor: "#c2ffca",
                                color: "#67ab70",
                              }}
                              pill
                            >
                              {item.status}
                            </MDBBadge>
                          </td>
                          <td>{item.totalAmount}</td>
                          <td>{item.paymentMethod}</td>
                          <td>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon
                                  className=" text-danger"
                                  onClick={() => deletePayment(item._id)}
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
    </div>
  );
}

export default Payments;
