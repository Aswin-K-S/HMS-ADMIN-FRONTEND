import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register api call
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")  // user is the body that is passed from the request and there is no reqheader for register function so it is empty
}

//login api call
export const loginAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")  // user is the body that is passed from the request and there is no reqheader for register function so it is empty
}

//login reception
export const loginRecptionAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/loginReception`,user,"")
}

//login doctor
export const loginDoctorAPI = async(user)=>{
    return await commonAPI("post",`${baseUrl}/loginDoctor`,user,"")
}


//----------------------------------admin-------------------------------------------------

//add Admin-----------------------------
export const addAdminAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-admin`,reqBody,reqHeader)
}

//View all admin
export const allAdminAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-admin`,"",reqHeader)
}

//view single Admin
export const viewSingleAdminAPI = async(adminId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/single-admin/${adminId}`,"",reqHeader)
}

//edit Admin
export const updateAdminAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-admin/${id}`,reqBody,reqHeader)
}

//update Password
export const updateAdminPasswordAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-adminpassword/${id}`,reqBody,reqHeader)
}

//delete Admin
export const deleteAdminAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-admin/${id}`,"",reqHeader)
}


//--------------------------------------medicine--------------------------------------------

export const addMedicineAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-medicine`,reqBody,reqHeader)
}

//All medicine Api call
export const AllMedicineAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-medicine`,"",reqHeader)
}

//Update medicine api call
export const updateMedicineAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-medicine/${id}`,reqBody,reqHeader)
}

//delete medicine
export const deleteMedicineAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-medicine/${id}`,"",reqHeader)
}

//update stock
export const updateMedicineStockAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/reception/update-medicinestock/${id}`,reqBody,reqHeader)
}

//---------------------------------------service-----------------------------------------

//add service

export const addServiceAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-service`,reqBody,reqHeader)
}

//get all service
export const allServiceAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-service`,"",reqHeader)
}

//Update service api call
export const updateServiceAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-service/${id}`,reqBody,reqHeader)
}

//delete service
export const deleteServiceAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-service/${id}`,"",reqHeader)
}


//-----------------------------------------------reception----------------------------------------

//add reception

export const addReceptionAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-reception`,reqBody,reqHeader)
}

//View all reception
export const allReceptionAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-reception`,"",reqHeader)
}

//view single Reception
export const viewSingleReceptionAPI = async(recId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/single-reception/${recId}`,"",reqHeader)
}


//edit reception
export const updateReceptionAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-reception/${id}`,reqBody,reqHeader)
}

//update password
export const updateReceptionPasswordAPI = async(recid,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/reception/update-password/${recid}`,reqBody,reqHeader)
}

//delete reception
export const deleteReceptionAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-reception/${id}`,"",reqHeader)
}

//--------------------------------------doctor---------------------------------------------------

//add doctor

export const addDoctorAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-doctor`,reqBody,reqHeader)
}

//View all doctor
export const allDoctorAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-doctor`,"",reqHeader)
}

//view single Doctor
export const viewSingleDoctorAPI = async(docId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/doctor/single-doctor/${docId}`,"",reqHeader)
}

//edit doctor
export const updateDoctorAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-doctor/${id}`,reqBody,reqHeader)
}

//update password
export const updateDoctorPasswordAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/doctor/update-password/${id}`,reqBody,reqHeader)
}


//delete doctor
export const deleteDoctorAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-doctor/${id}`,"",reqHeader)
}

//================================patient==========================================================

//add patient-----------------------------
export const addPatientAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-patient`,reqBody,reqHeader)
}

//View all patient
export const allPatientAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/all-patient`,"",reqHeader)
}

//view single Patient
export const viewSinglePatientAPI = async(patientId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/single-patient/${patientId}`,"",reqHeader)
}

//edit patient
export const updatePatientAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-patient/${id}`,reqBody,reqHeader)
}

//delete patient
export const deletePatientAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-patient/${id}`,"",reqHeader)
}

//edit patient healthinfo
export const updateHealthInfoAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/admin/update-healthinfo/${id}`,reqBody,reqHeader)
}


//=============records==============================

//add medical record
export const addMedicalRecordAPI = async(patientId,reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/admin/add-record/${patientId}`,reqBody,reqHeader)
}

//view user medical records
export const viewMedicalRecordAPI = async(patientId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/admin/view-records/${patientId}`,"",reqHeader)
}


//view all medical record
export const viewAllRecordAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-allrecords`,"",reqHeader)
}

//view single records
export const viewSingleMedicalRecordAPI = async(recordId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-singlerecords/${recordId}`,"",reqHeader)
}

//delete record
export const deleteRecordAPI = async(id,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/admin/delete-record/${id}`,"",reqHeader)
}

//--------------appointment--------------------
//add appointment
export const addAppointmentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/reception/new-appointment`,reqBody,reqHeader)
}

//view all appointment
export const getAppointmentsAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-appointments`,"",reqHeader)
}

//view single appointment
export const viewSingleAppointmentAPI = async(patientId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-singleappointment/${patientId}`,"",reqHeader)
}

//view  appointment for doctor
export const viewDoctorAppointmentAPI = async(doctorId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-doctorappointment/${doctorId}`,"",reqHeader)
}


//Update appointment status api call
export const updateAppointmentAPI = async(appointmentId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/reception/update-appointment/${appointmentId}`,reqBody,reqHeader)
}

//delete appointment
export const deleteAppointmentAPI = async(patientId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/reception/delete-appointment/${patientId}`,"",reqHeader)
}

//=================invoice----------------------

//add invoice
export const addInvoiceAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/reception/add-invoice`,reqBody,reqHeader)
}

//all invoice
export const getAllInvoiceAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/all-invoice`,"",reqHeader)
}

//view single invoice
export const viewSingleInvoiceAPI = async(invoiceId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-singleinvoice/${invoiceId}`,"",reqHeader)
}

//view all invoice of a single patient
export const viewAllSingleInvoiceAPI = async(patientId,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/view-allsingleinvoice/${patientId}`,"",reqHeader)
}

//delete Invoice
export const deleteInvoiceAPI = async(invoiceId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/reception/delete-invoice/${invoiceId}`,"",reqHeader)
}

//Update invoice status api call
export const updateInvoiceAPI = async(invoiceId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/reception/update-invoice/${invoiceId}`,reqBody,reqHeader)
}

//add payment
export const addPaymentAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/reception/add-payment`,reqBody,reqHeader)
}

//all payment
export const getAllPaymentAPI = async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/reception/all-payment`,"",reqHeader)
}

//delete payment
export const deletePaymentAPI = async(paymentId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/reception/delete-payment/${paymentId}`,"",reqHeader)
}