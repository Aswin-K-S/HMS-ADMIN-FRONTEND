import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
  import TextField from "@mui/material/TextField";
  import MenuItem from "@mui/material/MenuItem";

function AddMedicineInvoice({item,onAddMedicine}) {
    const [basicModal, setBasicModal] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState("");
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [price, setPrice] = useState(""); // Price state

    const toggleOpen = () => setBasicModal(!basicModal);



    const handleAdd = () => {
        // Check if the selected medicine is not empty
        if (selectedMedicine) {
          // Create a medicine object with name, quantity, and price
          const medicine = {
            id: selectedMedicine,
            name: item.find(med => med._id === selectedMedicine)?.medicineName || '', // Find the medicine name by ID
            days: quantity,
            price: item.find(med => med._id === selectedMedicine)?.price || 0, // Find the medicine price by ID
          };
          // Pass the medicine object to the parent component
          onAddMedicine(medicine);
          toggleOpen();
        }
      };


  return (
    <div>
      <Button
        variant="outlined"
        color="success"
        className="w-100 rounded-3"
        style={{ height: "50px" }}
        onClick={toggleOpen}
      >
        + Add Medicine
      </Button>

      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add item</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <TextField
                  id="outlined-basic"
                  className="mb-3"
                  variant="outlined"
                  select
                  label="Medicine"
                  value={selectedMedicine}
                  onChange={(e) => {
                    setSelectedMedicine(e.target.value);
                    setPrice(e.target.value.price); 
                  }}
                  style={{ width: "100%" }}
                >
                  {item.map((medicine) => (
                    <MenuItem key={medicine._id} value={medicine._id} disabled={medicine.stock === 0} >
                      {medicine.medicineName} ({medicine.stock} available)
                    </MenuItem>
                  ))}
                </TextField>

                    <TextField
                    id="outlined-basic"
                    className="mb-3"
                    variant="outlined"
                    label="Quantity"
                    type="number"
                    style={{ width: "100%" }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                      }}
                   
                    >

                    </TextField>

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn className="w-100 text-bg-success text-light" onClick={handleAdd}>ADD</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default AddMedicineInvoice;
