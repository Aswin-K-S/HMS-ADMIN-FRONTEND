import React, { useContext, useEffect, useState } from 'react'
import './CSS/Common.css'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getAllPaymentAPI } from '../../../../Services/allAPIs';
import { updateInvoiceContext } from '../../../../ContextAPI/ContextShare';
import { baseUrl } from '../../../../Services/baseUrl';
import img from '../../../../Assets/user.png'

function RecentTransactions() {
  const [allPayment, setAllPayment] = useState([]);
  const [todayPaymentsTotal, setTodayPaymentsTotal] = useState(0);
  const { updateInvoiceRes, setUpdateInvoiceRes } =
  useContext(updateInvoiceContext);
// API call to fetch all medicines
const getAllPayment = async () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await getAllPaymentAPI(reqHeader);
      console.log(result);
      if (result.status === 200) {
        setAllPayment(result.data);
      } else {
        alert("Failed to fetch payment");
      }
    } catch (error) {
      console.error("Error fetching payment:", error.message);
      alert("Error fetching payment");
    }
  }
};


useEffect(() => {
  const today = new Date();

  const todayPayments = allPayment.filter((payment) => {
    const paymentDate = new Date(payment.updatedAt);
    return (
      paymentDate.getDate() === today.getDate()
    );
  });
 
   // Calculate totals
   const calculateTotal = (payments) => {
    return payments.reduce(
      (total, payment) => total + payment.totalAmount,
      0
    );
  };

  setTodayPaymentsTotal(calculateTotal(todayPayments));
}, [allPayment, updateInvoiceRes]);


useEffect(()=>{
  getAllPayment()
},[updateInvoiceRes])
const sortedPayments = allPayment.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return (
    <div>
      <div className='d-flex justify-content-between'><span>Recent Transaction</span><span>Today &nbsp;&nbsp;  <MDBBadge color='success' pill> {todayPaymentsTotal}</MDBBadge></span></div>
      <div>
      <MDBTable align='middle' className='mt-4' hover>
      <MDBTableHead>
        <tr>
          <th scope='col'>Patient</th>
          <th scope='col'>Date</th>
          <th scope='col'>Status</th>
          <th scope='col'>Amount</th>
          <th scope='col'>Method</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {sortedPayments.slice(0, 5).map(item => (
    <tr key={item._id}> {/* Ensure each row has a unique key */}
      <td>
        <div className='d-flex align-items-center'>
          
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{item.patientName}</p>
            <p className='text-muted mb-0'>{item.phone}</p>
          </div>
        </div>
      </td>
      <td>
        <p className='fw-normal mb-1'>{new Date(item.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
      </td>
      <td>
        <MDBBadge color='subtle' className='pt-1 pb-1' style={{width:'65px',fontWeight:'normal',fontSize:'12px',backgroundColor:'#c2ffca',color:'#67ab70'}}  pill>
          {item.status}
        </MDBBadge>
      </td>
      <td>{item.totalAmount}</td>
      <td>
       {item.paymentMethod}
      </td>
    </tr>
  ))}
       
      </MDBTableBody>
    </MDBTable>
      </div>
    </div>

  )
}

export default RecentTransactions