import React, { createContext, useState } from 'react'

//add
export const addMedicineContextResponse = createContext()
export const addServiceContextResponse = createContext()
export const addReceptionContextResponse = createContext()
export const addDoctorContextResponse = createContext()
export const addPatientContextResponse = createContext()
export const addmedicalRecordContext = createContext()
export const addAppointmentContext = createContext()
export const addInvoiceContext = createContext()
export const addAdminContext = createContext()
//update
export const updateReceptionContextResponse = createContext()
export const updateServiceContextResponse = createContext()
export const updateMedicineContextResponse = createContext()
export const updateDoctorContextResponse = createContext()
export const updatePatientContextResponse = createContext()
export const updateInvoiceContext = createContext()
export const updateAdminContext = createContext()

function ContextShare({children}) {

  //add
    const [addMedicineRes,setAddMedicineRes] = useState("")
    const [addServiceRes,setAddServiceRes] = useState("")
    const [addReceptionRes,setAddReceptionRes] = useState("")
    const [addDoctorRes,setAddDoctorRes] = useState("")
    const [addPatientRes,setAddPatientRes] = useState("")
    const [addRecordres,setAddRecordRes] = useState("")
    const [addAppointmentRes,setAddAppointmentRes] = useState("")
    const [addInvoiceRes,setAddInvoiceRec] = useState("")
    const [addAdminRes,setAddAdminRes] = useState("")
  //update
    const [updateMedicineRes,setUpdateMedicineRes] = useState("")
    const [updateServiceRes,setUpdateServiceRes] = useState("")
    const [updateReceptionRes,setUpdateReceptionRes] = useState("")
    const [updateDoctorRes,setUpdateDoctorRes] = useState("")
    const [updatePatientRes,setUpdatePatientRes] = useState("")
    const [updateInvoiceRes,setUpdateInvoiceRes] = useState("")
    const [updateAdminRes,setUpdateAdminRes] = useState("")

  return (
    <div>
        <updateAdminContext.Provider value={{updateAdminRes,setUpdateAdminRes}}>
        <updateInvoiceContext.Provider value={{updateInvoiceRes,setUpdateInvoiceRes}}>
        <updatePatientContextResponse.Provider value={{updatePatientRes,setUpdatePatientRes}}>
        <updateDoctorContextResponse.Provider value={{updateDoctorRes,setUpdateDoctorRes}}>
        <updateMedicineContextResponse.Provider  value={{updateMedicineRes,setUpdateMedicineRes}}>
        <updateServiceContextResponse.Provider value={{updateServiceRes,setUpdateServiceRes}}>
        <updateReceptionContextResponse.Provider value={{updateReceptionRes,setUpdateReceptionRes}}>
        <addAdminContext.Provider value={{addAdminRes,setAddAdminRes}} >
        <addInvoiceContext.Provider value={{addInvoiceRes,setAddInvoiceRec}} >
        <addAppointmentContext.Provider value={{addAppointmentRes,setAddAppointmentRes}}  >
        <addmedicalRecordContext.Provider value={{addRecordres,setAddRecordRes}}  >
        <addPatientContextResponse.Provider value={{addPatientRes,setAddPatientRes}} >
        <addDoctorContextResponse.Provider value={{addDoctorRes,setAddDoctorRes}}>
        <addReceptionContextResponse.Provider value={{addReceptionRes,setAddReceptionRes}}>
        <addServiceContextResponse.Provider value={{addServiceRes,setAddServiceRes}}>
        <addMedicineContextResponse.Provider value={{addMedicineRes,setAddMedicineRes}}>
            {children}
        </addMedicineContextResponse.Provider>
        </addServiceContextResponse.Provider>
        </addReceptionContextResponse.Provider>
        </addDoctorContextResponse.Provider>
        </addPatientContextResponse.Provider> 
        </addmedicalRecordContext.Provider>
        </addAppointmentContext.Provider>
        </addInvoiceContext.Provider> 
        </addAdminContext.Provider> 
        </updateReceptionContextResponse.Provider>
        </updateServiceContextResponse.Provider>
        </updateMedicineContextResponse.Provider>
        </updateDoctorContextResponse.Provider>
        </updatePatientContextResponse.Provider>
        </updateInvoiceContext.Provider>
        </updateAdminContext.Provider>
   
    </div>
  )
}

export default ContextShare