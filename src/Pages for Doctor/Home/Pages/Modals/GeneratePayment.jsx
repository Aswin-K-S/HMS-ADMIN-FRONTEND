import React, { useContext, useState } from 'react';
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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { addPaymentAPI, updateInvoiceAPI } from '../../../../Services/allAPIs';
import { updateInvoiceContext } from '../../../../ContextAPI/ContextShare';

function GeneratePayment({details}) {
    console.log(details);
    const [basicModal, setBasicModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
  const toggleOpen = () => setBasicModal(!basicModal);
    const {updateInvoiceRes,setUpdateInvoiceRes} = useContext(updateInvoiceContext)
  


   const addPayment = async()=>{

    const reqBody = {
        invoiceId:details._id,
        userId: details.userId,
        status:'Paid',
        patientName: details.patientName,
        email: details.email,
        phone: details.phone,
        totalAmount: details.totalAmount,
        paymentMethod,
    };

    const token = sessionStorage.getItem("token")
    console.log(token);
    if(token){
        const reqHeader = {
        "Authorization": `Bearer ${token}` //To send token from client side to server side
        }
        try {
            const result = await addPaymentAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status==200){
                updateInvoice()

                alert("payment Successfully generated")
                toggleOpen()
            }
            else{
                alert("error generating payment")
            }


        } catch (error) {
            console.error("Error adding payment:", error.message);
            alert("Error adding payment"); 
        }
    }
   } 

  const updateInvoice =async()=>{
    const token = sessionStorage.getItem("token")
            console.log(token);
            if(token){
                const reqHeader = {
                "Authorization": `Bearer ${token}` //To send token from client side to server side
                }

               const reqBody = {
                status:'Paid'
               }

               const result = await updateInvoiceAPI(details._id,reqBody,reqHeader)
               console.log(result);
               if(result.status == 200){
                setUpdateInvoiceRes(result.data)
                console.log("successfull");
               }

            }
  }

  return (
    <div>
         <Button  onClick={toggleOpen} variant="contained" color="success" >Generate Payment</Button>
        
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
           

                      <TextField
                        id="outlined-select"
                        className='mt-3'
                        select
                        label="Payment Method"
                        defaultValue="" // Set an initial value or remove this line
                        style={{ width: "100%" }}
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <MenuItem value="Cash">Cash</MenuItem>
                        <MenuItem value="Card">Card</MenuItem>
                        <MenuItem value="Vidal Insurance">Vidal Insurance</MenuItem>
                        <MenuItem value="NHCF insurance">NHCF insurance</MenuItem>
                      </TextField>
            </MDBModalBody>

            <MDBModalFooter>
              
              <MDBBtn className='w-100' color='success' onClick={() => addPayment()}>Generate</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default GeneratePayment