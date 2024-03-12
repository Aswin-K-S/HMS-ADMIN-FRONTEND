import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateAdminPasswordAPI, updateDoctorPasswordAPI, updateReceptionPasswordAPI } from '../../../../Services/allAPIs';

function ChangePassword({ adminId }) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async() => {

    // Basic validation
    if ( !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
      const reqBody={
            newPassword:newPassword
        }    
          //get Token
          const token = sessionStorage.getItem("token")
          console.log(token);
          if(token){
            const reqHeader = {
              "Authorization": `Bearer ${token}` 
            }
              //api call
        const result = await updateReceptionPasswordAPI(adminId,reqBody,reqHeader)
        console.log(result);
        if(result.status == 200){
          console.log(result.data);
          alert("Password updated successfully")
            setConfirmPassword('')
            setNewPassword('')
      
        }
        else{
          console.log(result);
        }
        }  
      
  };

  return (
    <div>
      <Container>
        <Row>
        
          <Col md={12}>
            <TextField
              id="new-password"
              label="New Password"
              className="w-100 mt-4"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Col>
          <Col md={12}>
            <TextField
              id="confirm-password"
              label="Confirm Password"
              className="w-100 mt-4"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Col>
          <Col md={12} className='mt-4'>
            <Button variant='outlined' className='w-100' color='success' onClick={handleChangePassword}>
              Change Password
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChangePassword;
