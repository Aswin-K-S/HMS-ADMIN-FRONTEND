import './App.css';
import {  Link, Route, Routes } from 'react-router-dom';
import AdminHome from './Pages for Admin/Home/AdminHome';
import AuthAdmin from './Pages for Admin/Auth/AuthAdmin';
import MainHome from './MainHome';
import AuthRecep from './Pages for Pharmacy/Auth/AuthRecep';
import ReceptionHome from './Pages for Pharmacy/Home/ReceptionHome';
import AuthDoc from './Pages for Doctor/Auth/AuthDoc';
import DoctorHome from './Pages for Doctor/Home/DoctorHome';
import PageNotFound from './PageNotFound';


function App() {
  return (
    <div className="App">
     
     <section>
     <Routes>
          <Route path={'/'} element={<MainHome/>}/>
         <Route path={'/register'} element={<AuthAdmin register/>} />
         <Route path={'/login'}  element={<AuthAdmin/>} />
         <Route path={'/loginRecep'} element={<AuthRecep/>}/>
         <Route path={'/loginDoc'} element={<AuthDoc/>}/>
         <Route path={'/admin'}  element={<AdminHome/>} />
         <Route path={'/reception'}  element={<ReceptionHome/>} />
         <Route path={'/doctor'}  element={<DoctorHome/>} />
         <Route path={'*'}  element={<PageNotFound/>} />
        
        </Routes>
     </section>
    </div>
  );
}

export default App;
