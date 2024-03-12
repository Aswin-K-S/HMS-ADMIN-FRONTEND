import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { addAppointmentContext } from '../../../ContextAPI/ContextShare';
import { updateAppointmentAPI, viewDoctorAppointmentAPI } from '../../../Services/allAPIs';
import Button from '@mui/material/Button';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge, } from 'mdb-react-ui-kit';
import PatientView from './patientComponents/PatientView';

function AppointmentsDoc() {

    const existinguser = JSON.parse(sessionStorage.getItem("existinguser"))
    console.log(existinguser);
    const [isPatientViewVisible, setIsPatientViewVisible] = useState(false); 
    const [selectedPatientId, setSelectedPatientId] = useState(null); 
    const [singleAppointment,setSingleAppointment] = useState([])

    const {addAppointmentRes,setAddAppointmentRes} = useContext(addAppointmentContext)


   
  const handleViewClick = (id) => {
    console.log(id);
    setSelectedPatientId(id);
    setIsPatientViewVisible(true);
  };
  
  const handleBack = () => {
    setIsPatientViewVisible(false);
    setSelectedPatientId(null); 
  };


  const handleStatusChangeClick = async (appointmentId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'checked' : 'pending';
    const token = sessionStorage.getItem("token");
    if (token) {
        const reqHeader = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const result = await updateAppointmentAPI(appointmentId, { status: newStatus }, reqHeader);
            console.log(result);
            if (result.status === 200) {
                getSingleAppointment();
            } else {
                alert("Failed to update appointment status");
            }
        } catch (error) {
            console.error("Error updating appointment status:", error.message);
            alert("Error updating appointment status");
        }
    }
};

      // API call to fetch all reception
      const getSingleAppointment = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };
    
          try {
            const result = await viewDoctorAppointmentAPI(existinguser._id, reqHeader);
            console.log(result);
            if (result.status == 200) {
               // Filter appointments for the current day in IST
        const currentDateIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short' });

        const currentDayAppointments = result.data.filter(appointment => {
          const appointmentDateIST = new Date(appointment.dateOfVisit).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'short' });
          return appointmentDateIST === currentDateIST;
        });
            // Sort appointments by status ('pending' first)
            const sortedAppointments = currentDayAppointments.sort((a, b) => {
                if (a.status === 'pending' && b.status !== 'pending') return -1;
                if (a.status !== 'pending' && b.status === 'pending') return 1;
                return 0;
            });

            setSingleAppointment(sortedAppointments);
                console.log(singleAppointment);
            } else {
              alert("Failed to fetch appointment");
            }
          } catch (error) {
            console.error("Error fetching appointment:", error.message);
            alert("Error fetching appointment");
          }
        }
      };
  
    useEffect(()=>{
      getSingleAppointment()
    },[addAppointmentRes])

  return (
    <div>
         {!isPatientViewVisible && (
        <div>
        <div >
        <h3 className='text-center'>Todays Appointments</h3>
        </div>

    <Container>
        <Row>
            <div className="card rounded-5 mt-5">
            <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Description</th>
          <th scope='col'>Status</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {singleAppointment.length>0?singleAppointment.map(item=>(
        <tr>
          <th>{item.patientName}</th>
          <td>{item.description}</td>
          <td>{item.status=='pending'?<MDBBadge color="subtle" className="pt-1 pb-1 ps-2 pe-2" style={{width: "65px",fontWeight: "normal",fontSize: "12px",backgroundColor: "#faf6ca",color: "#a19300",}}pill>{item.status}</MDBBadge>
          :<MDBBadge color="subtle" className="pt-1 pb-1" style={{width: "65px",fontWeight: "normal",fontSize: "12px",backgroundColor: "#cafad0",color: "#0f7a1b",}}pill>{item.status}</MDBBadge>
          }
          </td>
          <td>
            <Button onClick={() => handleViewClick(item.patient)} variant='outlined' color='primary'>View</Button>
            {item.status==='pending'? <Button className='ms-3' onClick={() => handleStatusChangeClick(item._id, item.status)} variant='outlined' color='success'>Check</Button>: <Button className='ms-3' onClick={() => handleStatusChangeClick(item._id, item.status)} variant='outlined' color='error'>Uncheck</Button>}
           
          </td>
        </tr>
      )):"No appointments"
      }
      </MDBTableBody>
    </MDBTable>
            </div>
        </Row>
    </Container>
    </div> 
     )}   
     {isPatientViewVisible && <PatientView patientId={selectedPatientId} onBack={handleBack} />}
    </div>
  )
}

export default AppointmentsDoc