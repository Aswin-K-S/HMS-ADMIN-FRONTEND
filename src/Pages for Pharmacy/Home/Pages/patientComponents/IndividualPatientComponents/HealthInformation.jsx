import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { updateHealthInfoAPI } from "../../../../../Services/allAPIs";

function HealthInformation({ details,patientId }) {
  
  console.log(details);

const [patientDetails,setPatientDetails] = useState({
  bloodGroup:details.bloodGroup,
  height:details.height,
  weight:details.weight,
  allergies:details.allergies,
  habits:details.habits,
  medicalHistory:details.medicalHistory
})

const updateHealthInfo = async()=>{

  const {bloodGroup,height,weight,allergies,habits,medicalHistory} = patientDetails

  const reqBody = {bloodGroup,height,weight,allergies,habits,medicalHistory}
  const token = sessionStorage.getItem("token")
            console.log(token);
            if(token){
                const reqHeader = {
                "Authorization": `Bearer ${token}` //To send token from client side to server side
                }

                //api call
                const result = await updateHealthInfoAPI(patientId,reqBody,reqHeader);
                console.log(result.status);
                    if(result.status == 200){
                     
                    alert("updated successfully")
                    
                    }
                    else{
                    alert(result.response.data);
                    }

              }

}


  return (
    <div>
      <TextField
        id="outlined-select"
        select
        label="Blood group"
        className="mt-4"
        defaultValue=""
        style={{ width: "100%" }}
        value={patientDetails.bloodGroup}
        onChange={(e) =>
          setPatientDetails({ ...patientDetails, bloodGroup: e.target.value })
        }
      >
        <MenuItem value="A+">A+</MenuItem>
        <MenuItem value="A-">A-</MenuItem>
        <MenuItem value="B+">B+</MenuItem>
        <MenuItem value="B-">B-</MenuItem>
        <MenuItem value="AB+">AB+</MenuItem>
        <MenuItem value="AB-">AB-</MenuItem>
        <MenuItem value="O+">O+</MenuItem>
        <MenuItem value="O-">O-</MenuItem>
      </TextField>

      <TextField
        id="outlined-basic"
        label="Height"
        className="w-100 mt-4"
        variant="outlined"
        value={patientDetails.height}
        onChange={e=>setPatientDetails({...patientDetails,height:e.target.value})}
      />

      <TextField
        id="outlined-basic"
        label="Weight"
        className="w-100 mt-4"
        variant="outlined"
        value={patientDetails.weight}
        onChange={e=>setPatientDetails({...patientDetails,weight:e.target.value})}
      />

      <TextField
        id="outlined-multiline"
        multiline
        rows={4}
        label="Allergies"
        className="w-100 mt-4"
        variant="outlined"
        value={patientDetails.allergies}
        onChange={e=>setPatientDetails({...patientDetails,allergies:e.target.value})}
      />

      <TextField
        id="outlined-multiline"
        multiline
        rows={4}
        label="Habits"
        className="w-100 mt-4"
        variant="outlined"
        value={patientDetails.habits}
        onChange={e=>setPatientDetails({...patientDetails,habits:e.target.value})}
      />
      <TextField
        id="outlined-multiline"
        multiline
        rows={4}
        label="Medical History"
        className="w-100 mt-4"
        variant="outlined"
        value={patientDetails.medicalHistory}
        onChange={e=>setPatientDetails({...patientDetails,medicalHistory:e.target.value})}
      />

      <div className="text-center mt-4">
        <Button onClick={updateHealthInfo} variant="outlined" className="w-100" color="success">
          Update
        </Button>
      </div>
    </div>
  );
}

export default HealthInformation;
