import logo from './Assets/logo.png'
import React from 'react'
import {Container, Col, Row } from 'react-bootstrap'
import {  Link } from 'react-router-dom';

function MainHome() {
  return (
    <div style={{ backgroundImage: `url(https://i.pinimg.com/originals/d4/1d/f5/d41df53d347c7566f7e6646d630fd5f2.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh',overflow:'hidden' }}>
<header>
  <h2 className='text-center' style={{fontSize:'50px'}}>Dashboard Login</h2>
</header>
<div className="container vh-100">

      <Row  className='d-flex justify-content-center align-content-center vh-100 ms-5' style={{position:'relative'}}>
        <Col md={4}>
      <Link to={'/login'}>  <div className='card text-center d-flex justify-content-center' style={{color:'white', width: '16.276041666666668vw', height: '34.24657534246575vh', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          <div>
          <img src="https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-host-and-admin-marketing-job-vacancies-vector-png-image_6480101.png" style={{width:' 34.24657534246575vh',height:' 16.276041666666668vw'}} alt="" />
          </div>
          <h5 style={{position:'relative',top:'-20px'}}>Admin</h5>
        </div></Link>
        </Col>

        <Col md={4}>
      <Link to={'/loginDoc'}>  <div className='card text-center d-flex justify-content-center' style={{color:'white', width: '16.276041666666668vw', height: '34.24657534246575vh', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div>  
       <img src="https://img.hotimg.com/198-1985222_avatar-doctor-png-transparent-png-removebg-preview.png" style={{width:' 27.397260273972602vh',height:' 27.397260273972602vh'}} alt="" />
       </div>
       <h5 >Doctor</h5>
        </div></Link>
        </Col>

        <Col md={4}>
        <Link to={'/loginRecep'}>  <div className='card text-center d-flex justify-content-center' style={{color:'white', width: '16.276041666666668vw', height: '34.24657534246575vh', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <div>
        <img src="https://img.hotimg.com/recption.png" style={{width:' 27.397260273972602vh',height:' 27.397260273972602vh'}} alt="" />
        </div>
        <h5>Reception</h5>
        </div></Link>
        </Col>
      </Row>

      </div>
    </div>
  )
}

export default MainHome