
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import bglogin from "../../Assets/bglogin.jpg";
import img from "../../Assets/img3.jpg";
import { loginAPI } from "../../Services/allAPIs";
import { registerAPI } from "../../Services/allAPIs";


function AuthAdmin({register}) {
  const isRegisterForm = register ? true : false;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerData = async()=>{
    const {username,email,password} = userData
    if(!username || !email || !password){
      alert("Please fill the form")
    }
    else{
      const result = await registerAPI(userData)
      console.log(result);      

        if(result.status==200){
          alert(result.data)
          
          navigate('/login')
          
        }
        else{
          alert(result.response.data)
        }
    }
    console.log(userData);
  }

  const loginData = async () => {
    console.log(userData);
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the form");
    } else {
      const result = await loginAPI(userData);
      console.log(result);
      if (result.status == 200) {
        console.log("success");
        alert("Login Successfull");
        sessionStorage.setItem(
          "existinguser",
          JSON.stringify(result.data.user)
        );
        sessionStorage.setItem("token", result.data.token);
        navigate("/admin");
      } else {
        alert("Invalid user data");
      }
    }
    console.log(userData);
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
              {isRegisterForm ? "SIGN UP" : "LOGIN"}
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
            {isRegisterForm && (
              <input
                type="text"
                value={userData.username}
                onChange={e=>setUserData({...userData,username:e.target.value})}
                className="form-control mb-3 rounded-4"
                style={{ backgroundColor: "whitesmoke" }}
                placeholder="Username"
                
              />
            )}

            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="form-control mb-3 rounded-4"
              style={{ backgroundColor: "whitesmoke" }}
              placeholder="Email"
            
            />
            <input
              type="password"
              value={userData.password}
              onChange={e=>setUserData({...userData,password:e.target.value})}
              className="form-control mb-4 rounded-4"
              style={{ backgroundColor: "whitesmoke" }}
              placeholder="Password"
             
            />
            {isRegisterForm ? (
              <div className="text-center">
                <button onClick={registerData} className="btn btn-success rounded-pill">
                  SIGN UP
                </button>

                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "whitesmoke" }}
                >
                  <p className="mt-3" style={{ marginBottom: "-5px" }}>
                    Already Registered? Please login here...
                  </p>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={loginData}
                  className="btn btn-success rounded-pill"
                >
                  LOGIN
                </button>

                <Link
                  to={"/register"}
                  style={{ textDecoration: "none", color: "whitesmoke" }}
                >
                  <p className="mt-4" style={{ marginBottom: "-5px" }}>
                    New to here? Please sign up...
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthAdmin;
