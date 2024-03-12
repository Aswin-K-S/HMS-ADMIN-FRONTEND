import React, { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
import { AllMedicineAPI } from "../../../../../Services/allAPIs";
import { Container, Row, Col } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";

function AddMedicineMedical({ onSelectMedicines }) {
  const [getMedicine, setGetMedicine] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dosageQuantity, setDosageQuantity] = useState("");
  const [days, setDays] = useState("");
  const [dosageTimings, setDosageTimings] = useState({
    morning: false,
    afternoon: false,
    evening: false,
    night: false,
  });
  const [centredModal, setCentredModal] = useState(false);

  const toggleOpen = () => setCentredModal(!centredModal);

  const getAllMedicine = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await AllMedicineAPI(reqHeader);
        if (result.status === 200) {
          setGetMedicine(result.data);
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
    getAllMedicine();
  }, []);

  const formatDosageTimings = () => {
    let timings = "";
    if (dosageTimings.morning) timings += "M/";
    if (dosageTimings.afternoon) timings += "A/";
    if (dosageTimings.evening) timings += "E/";
    if (dosageTimings.night) timings += "N/";
    return timings.slice(0, -1);
  };

  const handleSave = () => {
    const selectedMedicineObject = {
      id: selectedMedicine._id,
      name: selectedMedicine.medicineName,
      price:selectedMedicine.price,
      instructions,
      dosageQuantity,
      days,
      dosageTimings: formatDosageTimings(),
    };
  
    onSelectMedicines(selectedMedicineObject);

     // Clear the fields after saving
     setSelectedMedicine('');
      setInstructions("");
      setDosageQuantity("");
      setDays("");
      setDosageTimings({
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
      });

    toggleOpen()
  };

  return (
    <div>
      <Button
        onClick={toggleOpen}
        variant="outlined"
        color="success"
        className="w-100"
        style={{ height: "50px" }}
      >
        + Add Medicine
      </Button>
      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Medicine</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ zIndex: 1200 }}>
              <div className="d-flex justify-content-center flex-column">
                <TextField
                  id="outlined-basic"
                  className="mb-3"
                  variant="outlined"
                  select
                  label="Medicine"
                  value={selectedMedicine}
                  onChange={(e) => setSelectedMedicine(e.target.value)}
                  style={{ width: "100%" }}
                >
                  {getMedicine.map((medicine) => (
                    <MenuItem key={medicine._id} value={medicine}>
                      {medicine.medicineName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className="mb-3"
                  id="outlined-select"
                  select
                  label="Instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="After Meal">After Meal</MenuItem>
                  <MenuItem value="Before Meal">Before Meal</MenuItem>
                </TextField>
                <TextField
                  className="mb-3"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Dosage Quantity"
                  value={dosageQuantity}
                  onChange={(e) => setDosageQuantity(e.target.value)}
                />
                <TextField
                  className="mb-3"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Quantity"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
                <Row>
                  <Col>
                    <Checkbox
                      checked={dosageTimings.morning}
                      onChange={(e) =>
                        setDosageTimings({
                          ...dosageTimings,
                          morning: e.target.checked,
                        })
                      }
                    />
                    <label>Morning(M)</label>
                  </Col>
                  <Col>
                    <Checkbox
                      checked={dosageTimings.afternoon}
                      onChange={(e) =>
                        setDosageTimings({
                          ...dosageTimings,
                          afternoon: e.target.checked,
                        })
                      }
                    />
                    <label>Afternoon(A)</label>
                  </Col>
                  <Col>
                    <Checkbox
                      checked={dosageTimings.evening}
                      onChange={(e) =>
                        setDosageTimings({
                          ...dosageTimings,
                          evening: e.target.checked,
                        })
                      }
                    />
                    <label>Evening(E)</label>
                  </Col>
                  <Col>
                    <Checkbox
                      checked={dosageTimings.night}
                      onChange={(e) =>
                        setDosageTimings({
                          ...dosageTimings,
                          night: e.target.checked,
                        })
                      }
                    />
                    <label>Night(N)</label>
                  </Col>
                </Row>
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
                  variant="outlined"
                  color="success"
                  className="w-100"
                  onClick={handleSave}
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

export default AddMedicineMedical;
