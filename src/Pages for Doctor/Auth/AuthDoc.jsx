import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import bglogin from "../../Assets/bglogin.jpg";
import img from "../../Assets/img3.jpg";
import { loginDoctorAPI } from "../../Services/allAPIs";



function AuthDoc() {

    const location = useNavigate();
    const [recepData,setRecepData] = useState({
        email:"",
        password:""
    })

    const loginData = async () => {
        const { email, password } = recepData;
        if (!email || !password) {
          alert("Please fill the form");
        } else {
          const result = await loginDoctorAPI(recepData);
          console.log(result);
          if (result.status == 200) {
            alert("Login Successfull");
            sessionStorage.setItem(
              "existinguser",
              JSON.stringify(result.data.user)
            );
            sessionStorage.setItem("token", result.data.token);
            location("/doctor");
          } else {
            alert("Invalid user data");
          }
        }
      };
  return (
    <div>
         <section
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "400px",
              height: "330px",
              marginTop: "25px",
              borderRadius: "20px 20px 0px 0px",
              boxShadow: "3px -3px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h1
              style={{
                color: "whitesmoke",
                fontSize: "60px",
                fontWeight: "700",
              }}
            >
               LOGIN
            </h1>
          </div>
          <div
            className=""
            style={{
              width: "400px",
              padding: "30px",
              background: "transparent",
              borderRadius: "0px 0px 20px 20px",
              backdropFilter: "blur(34px)",
              boxShadow:
                " 3px 4px 8px 1px rgba(0, 0, 0, 0.2), 3px 6px 10px 1px rgba(0, 0, 0, 0.19)",
            }}
          >
           

            <input
              type="email"
              value={recepData.email}
              onChange={(e) =>
                setRecepData({ ...recepData, email: e.target.value })
              }
              className="form-control mb-3 rounded-4"
              style={{ backgroundColor: "whitesmoke" }}
              placeholder="Email"
            
            />
            <input
              type="password"
              value={recepData.password}
              onChange={e=>setRecepData({...recepData,password:e.target.value})}
              className="form-control mb-4 rounded-4"
              style={{ backgroundColor: "whitesmoke" }}
              placeholder="Password"
             
            />
           
              <div className="text-center">
                <button
                  onClick={loginData}
                  className="btn btn-success rounded-pill"
                >
                  LOGIN
                </button>

              </div>
           
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthDoc