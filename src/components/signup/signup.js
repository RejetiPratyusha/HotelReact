import axios from "axios";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [customer,setCustomer]=useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const  doSignUp = () => {
    let customerObj={
        "name":name,
        "phone":phone,
        "email":email,
        "user":{
        "username":username,
        "password":password
        }
    }
    //console.log(JSON.stringify(customerObj))
    axios.post('http://localhost:8083/feelhome/customer/add',customerObj)
    .then(response=>{
        setCustomer(response.data)
        navigate('/login/login?msg="signup success')
    })
    .catch(function (error){
        console.log(error)
        setMsg("Issue in processing sign up")
    });
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>FEEL HOME</Navbar.Brand> 
        </Container>
      </Navbar>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3>Sign Up</h3>
              </div>
              <div className="card-body">
                {msg !== "" ? (
                  <div class="alert alert-danger" role="alert">
                    {msg}
                  </div>
                ) : (
                  ""
                )}
                <div className="row " style={{ textAlign: "right" }}>
                  {/* Read Name */}
                  <div className="col-md-6">
                    <label>Enter Name:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>


                  


                  <div className="col-md-6">
                    <label>Enter Email:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>



                  {/* Read Contact */}
                  <div className="col-md-6">
                    <label>Enter Contact No:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                
                  <hr />
                  <div className="col-md-6">
                    <label>Enter Username:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="email"
                      className="form-control"
                       minLength= "5"
                       maxlength="12"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row" style={{ textAlign: "right" }}>
                  <div className="col-md-6">
                    <label>Enter Password:</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={{ textAlign: "right" }}>
                <button className="btn btn-primary" onClick={() => doSignUp()}>
                  SignUp
                </button>
              </div>
            </div>
            <div style={{ textAlign: "left" }} className="mt-4">
              <span>
                Have an Account?
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/login/login")}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
export default Signup;