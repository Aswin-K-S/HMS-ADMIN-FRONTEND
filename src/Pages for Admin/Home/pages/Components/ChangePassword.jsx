import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateAdminPasswordAPI } from '../../../../Services/allAPIs';

function ChangePassword({ adminId ,admindet}) {
console.log(admindet);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 const handleChangePassword = async () => {
  try {
    // Basic validation
    if ( !newPassword || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
  
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    // Prepare request body
    const reqBody = {
      newPassword: newPassword
    };
    
    // Retrieve token from session storage
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Token not found");
      return;
    }

    // Set authorization header
    const reqHeader = {
      "Authorization": `Bearer ${token}` 
    };

    // Make API call to update password
    const result = await updateAdminPasswordAPI(adminId, reqBody, reqHeader);

    // Handle response
    if (result.status === 200) {
      alert("Password updated successfully");
      // Clear input fields
      setConfirmPassword('');
      setNewPassword('');
    } else {
      console.log(result);
      alert("Failed to update password. Please try again.");
    }
  } catch (error) {
    console.error('Error updating password:', error.message);
    alert('Error updating password. Please try again.');
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
