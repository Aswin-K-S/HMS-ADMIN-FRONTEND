
import React, { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Container, Row, Col } from "react-bootstrap";
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
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CreateOutlined from "@mui/icons-material/CreateOutlined";
import { updateMedicineAPI } from "../../../../Services/allAPIs";
import { addMedicineContextResponse, updateMedicineContextResponse } from "../../../../ContextAPI/ContextShare";


function EditMedicine({meddet}) {
    console.log(meddet);
    const [centredModal, setCentredModal] = useState(false);

    const [switchState, setSwitchState] = useState(false);
    const toggleOpen = () => setCentredModal(!centredModal);
  
    const toggleSwitch = () => setSwitchState(!switchState);

   const {updateMedicineRes,setUpdateMedicineRes} = useContext(updateMedicineContextResponse)

    const [medicineDetails, setMedicineDetails] = useState({
        id:meddet._id,
        medicineName: meddet.medicineName,
        price: meddet.price,
        stock: meddet.stock,
        measure: meddet.measure,
        description: meddet.description,
        status: meddet.status,
      });
    
      useEffect(() => {
        // Automatically update the status based on the stock value
        if (medicineDetails.stock <= 0) {
          setMedicineDetails((prevDetails) => ({
            ...prevDetails,
            status: "Out of stock"
          }));
        } else {
          setMedicineDetails((prevDetails) => ({
            ...prevDetails,
            status: "In stock"
          }));
        }
      }, [medicineDetails.stock]);
      
      const updateMedicine = async()=>{
        const {id, medicineName, price, stock, measure, status, description } = medicineDetails;

        // if(!medicineName || !price || !stock || !measure || !description){
        //     alert("Please fill the form");
        //     return;
        // }
        const reqBody = {
            medicineName,
            price,
            stock,
            measure,
            status,
            description
          };
          const token = sessionStorage.getItem("token")
            console.log(token);
            if(token){
                const reqHeader = {
                "Authorization": `Bearer ${token}` //To send token from client side to server side
                }

    //api call
      // api call
      const result = await updateMedicineAPI(id,reqBody,reqHeader);
      console.log(result.status);
          if(result.status == 200){
            setUpdateMedicineRes(result.data)
          alert("updated successfully")
         
          toggleOpen();
          
          }
          else{
          alert(result.response.data);
          }
    

  }
}

  return (
    <div>
<CreateOutlined onClick={toggleOpen} color="primary"/>
      

      <MDBModal tabIndex="-1" open={centredModal} setOpen={setCentredModal}>
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update Medicine</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ zIndex: 1200 }}>
              <Container>
                <Row className="mb-4">
                  <Col md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Medicine Name"
                      className="w-100"
                      variant="outlined"
                      value={medicineDetails.medicineName}
                      onChange={(e) =>
                        setMedicineDetails({
                          ...medicineDetails,
                          medicineName: e.target.value,
                        })
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      className="w-100"
                      variant="outlined"
                      value={medicineDetails.price}
                      onChange={(e) =>
                        setMedicineDetails({
                          ...medicineDetails,
                          price: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={6}>
                    <TextField
                      id="outlined-select"
                      select
                      label="Measure"
                      defaultValue="" // Set an initial value or remove this line
                      style={{ width: "100%" }}
                      value={medicineDetails.measure}
                      onChange={(e) =>
                        setMedicineDetails({
                          ...medicineDetails,
                          measure: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="mg">Milligram (mg)</MenuItem>
                      <MenuItem value="ml">Milliliter (ml)</MenuItem>
                      <MenuItem value="gm">Gram (gm)</MenuItem>
                      <MenuItem value="kg">Kilogram (kg)</MenuItem>
                      <MenuItem value="lb">Pound (lb)</MenuItem>
                      <MenuItem value="tbsp">Tablespoon (tbsp)</MenuItem>
                      <MenuItem value="tablet">Tablet</MenuItem>
                      <MenuItem value="capsule">Capsule</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={6}>
                    <TextField
                      id="outlined-basic"
                      label="In Stock"
                      className="w-100"
                      variant="outlined"
                      value={medicineDetails.stock}
                      onChange={(e) =>
                        setMedicineDetails({
                          ...medicineDetails,
                          stock: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md={12}>
                    <TextField
                      id="outlined-multiline"
                      multiline
                      rows={4}
                      label="Description"
                      className="w-100"
                      variant="outlined"
                      value={medicineDetails.description}
                      onChange={(e) =>
                        setMedicineDetails({
                          ...medicineDetails,
                          description: e.target.value,
                        })
                      }
                    />
                    
                  </Col>
                </Row>
              </Container>
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
                  onClick={updateMedicine}
                >
                  Save
                </Button>
              </div>
            </div>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </div>
  )
}

export default EditMedicine