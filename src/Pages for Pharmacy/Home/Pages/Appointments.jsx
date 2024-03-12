import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddAppointments from './Modals/AddAppointments';
import { deleteAppointmentAPI, getAppointmentsAPI } from '../../../Services/allAPIs';
import { addAppointmentContext } from '../../../ContextAPI/ContextShare';

const localizer = momentLocalizer(moment);

function Appointments() {
  const [events, setEvents] = useState([]);
  const [allAppointments,setAllAppointments] = useState([])
  const {addAppointmentRes,setAddAppointmentRes} = useContext(addAppointmentContext)
 // API call to fetch all medicines
 const getAllAppointments = async () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await getAppointmentsAPI(reqHeader);
      if (result.status === 200) {
        console.log(result);
        setAllAppointments(result.data);
        const formattedEvents = result.data.map(appointment => ({
          title: appointment.patientName,
          start: moment(appointment.startTime).toDate(),
          end: moment(appointment.endTime).toDate(),
          id: appointment._id,
        }));
        setEvents(formattedEvents);
      } else {
        alert('Failed to fetch medicines');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error.message);
      alert('Error fetching medicines');
    }
  }
};

useEffect(()=>{
  getAllAppointments()
},[addAppointmentRes])

 // Function to handle appointment deletion
 const deleteAppointment = async appointmentId => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await deleteAppointmentAPI(appointmentId, reqHeader);
      if (result.status === 200) {
        // Remove the deleted appointment from events
        setEvents(prevEvents => prevEvents.filter(event => event.id !== appointmentId));
        console.log('Appointment deleted successfully');
      } else {
        alert('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
      alert('Error deleting appointment');
    }
  }
};

// Custom event handler for appointment click
const handleAppointmentClick = event => {
  if (window.confirm('Are you sure you want to delete this appointment?')) {
    deleteAppointment(event.id);
  }
};


  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleAppointmentClick}
      />
      <AddAppointments/>
    </div>
  );
}

export default Appointments;
