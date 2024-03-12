import React, { useContext, useEffect, useState } from "react";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {
  addMedicalRecordAPI,
  allServiceAPI,
} from "../../../../../Services/allAPIs";
import AddMedicineMedical from "./AddMedicineMedical";
import { addmedicalRecordContext } from "../../../../../ContextAPI/ContextShare";

function AddMedicalRecord({patientId, onBack }) {
  const [allTreatments, setAllTreatments] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const {addRecordres,setAddRecordRes} = useContext(addmedicalRecordContext)

  const [medicalRecordDetails, setMedicalRecordDetails] = useState({
    date: new Date(),
    doctorName: "",
    complaints: "",
    diagnosis: "",
    vitalSigns: "",
    notes:"",
    selectedTreatments:[],
    selectedMedicines: [],
  });



  const handleBackClick = () => {
    if (onBack) {
      onBack();
    }
  };

  // API call to fetch all medicines
  const getAllService = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await allServiceAPI(reqHeader);
        if (result.status === 200) {
          setAllTreatments(result.data);
        } else {
          alert("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error.message);
        alert("Error fetching services");
      }
    }
  };

  useEffect(() => {
    getAllService();
  }, []);



  const handleCheckboxChange = (treatmentId, treatmentName) => (event) => {
    const isChecked = event.target.checked;
  
    setCheckedItems((prevState) => ({
      ...prevState,
      [treatmentName]: isChecked,
    }));
  
    if (isChecked) {
      // If the checkbox is checked, add the treatment ID and name to the selected treatments list
      setSelectedTreatments((prevState) => [
        ...prevState,
        { id: treatmentId, name: treatmentName },
      ]);
    } else {
      // If the checkbox is unchecked, remove the treatment ID and name from the selected treatments list
      setSelectedTreatments((prevState) =>
        prevState.filter((treatment) => treatment.id !== treatmentId)
      );
    }
  };

  const handleSelectMedicines = (selectedMedicine) => {
    setSelectedMedicines([...selectedMedicines, selectedMedicine]);
  };

  console.log(selectedMedicines);
  console.log(selectedTreatments);

  const handleRemoveMedicine = (index) => {
    const updatedMedicineData = [...selectedMedicines];
    updatedMedicineData.splice(index, 1);
    setSelectedMedicines(updatedMedicineData);
  };

  useEffect(() => {
    setMedicalRecordDetails(prevState => ({
      ...prevState,
      selectedMedicines: selectedMedicines,
      selectedTreatments: selectedTreatments
    }));
  }, [selectedMedicines, selectedTreatments]);


  const medicalRecordAdd = async () => {

console.log(patientId);
    const {date, doctorName, complaints, diagnosis, vitalSigns ,notes,selectedTreatments, selectedMedicines } = medicalRecordDetails;
    console.log(medicalRecordDetails);
  
    // // Check if all required fields are filled
    // if (!doctorName || !complaints || !diagnosis || !vitalSigns ) {
    //   alert("Please fill all the required fields");
    //   return;
    // }
  
    // Prepare the request body
    const reqBody = {
      patientId: patientId, // Assuming you have the user's ID accessible
      date:date,
      doctorName: doctorName,
      complaints: complaints,
      diagnosis: diagnosis,
      vitalSigns: vitalSigns,
      notes:notes,
      treatments: selectedTreatments,
      medicines: selectedMedicines,
    };
  
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
  
    try {
 
      const result = await addMedicalRecordAPI(patientId,reqBody, reqHeader);
      
      console.log(result);
      if (result.status === 200) {
        setAddRecordRes(result.data)
        alert("Medical record added successfully");

       
        setMedicalRecordDetails({ 
          date: new Date(),
          doctorName: "",
          complaints: "",
          diagnosis: "",
          vitalSigns: "",
          notes:"",
          selectedTreatments: [],
          selectedMedicines: [],
        });
        handleBackClick()
      } else {
        // Handle error
        alert("Failed to add medical record");
      }
    } catch (error) {
      console.error("Error adding medical record:", error);
      // Handle error
      alert("Error adding medical record");
    }
  }
  };


  return (
    <div>
      <Tooltip title="Go Back">
        <IconButton onClick={handleBackClick}>
          <ReplyOutlinedIcon />
        </IconButton>
      </Tooltip>
      New Medical Record
      <Container>
        <Row>
          <Col md={12}>
            <TextField
              value={medicalRecordDetails.doctorName}
              onChange={(e) => setMedicalRecordDetails({ ...medicalRecordDetails, doctorName: e.target.value })}
              id="outlined-basic"
              label="Doctor"
              className="w-100 mt-4 mb-4"
              variant="outlined"
            />
            <TextField
              value={medicalRecordDetails.complaints}
              onChange={(e) => setMedicalRecordDetails({ ...medicalRecordDetails, complaints: e.target.value })}
              id="outlined-multiline"
              multiline
              rows={4}
              label="complaints "
              className="w-100 mb-4"
              variant="outlined"
            />
            <TextField
            value={medicalRecordDetails.diagnosis}
            onChange={(e) => setMedicalRecordDetails({ ...medicalRecordDetails, diagnosis: e.target.value })}
              id="outlined-multiline"
              multiline
              rows={4}
              label="Diagnosis"
              className="w-100 mb-4"
              variant="outlined"
            />
            <TextField
            value={medicalRecordDetails.vitalSigns}
            onChange={(e) => setMedicalRecordDetails({ ...medicalRecordDetails, vitalSigns: e.target.value })}
              id="outlined-multiline"
              multiline
              rows={4}
              label="Vital Signs"
              className="w-100 mb-4"
              variant="outlined"
            />
             <TextField
            value={medicalRecordDetails.notes}
            onChange={(e) => setMedicalRecordDetails({ ...medicalRecordDetails, notes: e.target.value })}
              id="outlined-multiline"
              multiline
              rows={4}
              label="Notes"
              className="w-100 mb-4"
              variant="outlined"
            />
            <p>Treatment</p>
            <Container>
              <Row>
                {allTreatments.map((item, index) => (
                  <Col key={index} sm={12} md={6} lg={4} xl={4}>
                    {" "}
                    <Checkbox
                      checked={checkedItems[item._id]}
                      onChange={handleCheckboxChange(item._id,item.serviceName)}
                    />{" "}
                    <label>{item.serviceName}</label>
                  </Col>
                ))}
              </Row>
            </Container>
            <p className="mt-3">Medicine</p>
            <div className="">
              <MDBTable hover>
                <MDBTableHead className="bg-body-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Dosage Quantity</th>
                    <th scope="col">Dosage Timings</th>
                    <th scope="col">Instruction</th>
                    <th scope="col">Days</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {selectedMedicines.map((medicine, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{medicine.name}</td>
                      <td>{medicine.dosageQuantity}</td>
                      <td>{medicine.dosageTimings}</td>
                      <td>{medicine.instructions}</td>
                      <td>{medicine.days}</td>
                      <td>
                        <IconButton
                          className=""
                          style={{ marginTop: "-10px" }}
                          aria-label="delete"
                          color="error"
                          onClick={() => handleRemoveMedicine(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <AddMedicineMedical onSelectMedicines={handleSelectMedicines} />
            <div className="mt-5">
              <Row>
                <Col md={6}>
                  <Button
                    variant="outlined"
                    color="error"
                    className="w-100"
                    style={{ height: "50px" }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={6}>
                  {" "}
                  <Button
                    variant="contained"
                    onClick={medicalRecordAdd}
                    color="success"
                    className="w-100"
                    style={{ height: "50px" }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddMedicalRecord;
