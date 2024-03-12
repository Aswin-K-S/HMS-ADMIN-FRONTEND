import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './CSS/dashboard.css';
import TotalPatients from "./Components/TotalPatients";
import TotalAppointments from "./Components/TotalAppointments";
import TotalPrescriptions from "./Components/TotalPrescriptions";
import TotalEarnings from "./Components/TotalEarnings";
import TotalEarningsLines from "./Components/TotalEarningsLines";
import RecentPatients from "./Components/RecentPatients";
import RecentTransactions from "./Components/RecentTransactions";

function Dashboard() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="card" style={{height:'197px'}}>
             
              <div className="card-body">
               <TotalPatients/>
              </div>
             
            </div>
          </Col>
          <Col md={3}>
            <div className="card" style={{height:'197px'}}>
             
              <div className="card-body">
               <TotalAppointments/>
              </div>
             
            </div>
          </Col>
          <Col md={3}>
            <div className="card" style={{height:'197px'}}>
             
              <div className="card-body">
                <TotalPrescriptions/>
              </div>
             
            </div>
          </Col>
          <Col md={3}>
            <div className="card" style={{height:'197px'}}>
              
              <div className="card-body">
               <TotalEarnings/>
              </div>
             
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={9}>
            <div className="card cd1" style={{height:'397px'}}>
              
              <div className="card-body">
                <TotalEarningsLines/>
              </div>
             
            </div>
          </Col>
          <Col md={3}>
            <div className="card cd1" style={{height:'397px',overflow:'hidden'}}>
             
              <div className="card-body">
               <RecentPatients/>
              </div>
             
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <div className="card cd1" style={{height:'557px'}}>
             
              <div className="card-body">
               <RecentTransactions/>
              </div>
             
            </div>
          </Col>
      
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
