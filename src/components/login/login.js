import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";

import { Container, Navbar } from "react-bootstrap";

export default function Login() {
  const [email] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useState({});

  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  console.log(location);

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = async (email, password) => {
    let token = window.btoa(username + ":" + password);
    axios
      .get("http://localhost:8083/user/login", {
        headers: {
          Authorization: "Basic " + token,
        },
      })
      .then(function (response) {
        //handle success
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.id + 1);
        localStorage.setItem("isLoggedIn", true);
        let role = response.data.role;
        console.log(token);
        switch (role) {
          case "CUSTOMER":
            const state = location.state;
            if (state?.from) {
              // Redirects back to the previous unauthenticated routes
              navigate({
                pathname: state?.from,
                search: createSearchParams({
                  checkIn: state.checkIn,
                  checkOut: state.checkOut,
                }).toString(),
              });
            } else {
              navigate("/");
            }

            // const roomId = localStorage.getItem("roomId");
            break;
          case "HOTEL_ADMIN":
            navigate("/AdminDashboard");
            break;
          case "EXECUTIVE":
            navigate("/Executive/executiveDashboard");
            break;
          case "Hr":
            navigate("/Hr/HrDashboard");
            break;
          default:
        }
      })
      .catch(function (error) {
        console.log("Invalid");
        //handle error
        //setMsg("Invalid Credentials");
        alert("Invalid Credentials");
        return;
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/login1.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "110vh",
      }}
    >
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>FEEL HOME</Navbar.Brand>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Brand href="/" onClick={() => navigate("/")}>
            <button className="btn btn-primary">Home</button>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="Container mt-5 ml-5 mb-4" align="center">
        <div className="row mx-auto mt-5">
          <div className="mx-auto col-md-6 mt-5 pt-4">
            <div className="card mb-5 p-2 shadow rounded">
              <div className="card-body mt-1">
                <div className="row mb-3 ml-3 text-center">
                  <h3 className="text-success text-center border-bottom border-success p-3 ml-5">
                    LOGIN
                  </h3>
                  <div>
                    <label className="form-label">Enter the Credentials</label>
                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="Enter the Username"
                      onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter the Password"
                      onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                  </div>
                  <div className="custom-margin">
                    <div className="mb-10">
                      {" "}
                      {/* Add margin-bottom class to create spacing */}
                      <button
                        className="btn btn-primary"
                        onClick={() => handleLogin(email, password)}
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
                </div>
                <div className="custom-margin">
                  <div className="mb-1 mt-5 text-success ml-0">
                    <div style={{ textAlign: "left" }} className="mt-4">
                      <span>
                        Don't have an account?
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate("/signup")}
                        >
                          signup
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
