import axios from "axios";
import { useEffect, useState } from "react";
import "./customerbookingdetails.css";
import NavbarComponent from "../navbar/navbar";
import { Input } from "antd";
import { useNavigate } from "react-router";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const customerId = localStorage.getItem("id");
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/customer/getone/${customerId}`)
      .then((response) => setProfile(response.data));
  }, [customerId]);

  return (
    <div>
      <NavbarComponent />
      <div
        className="tab text-center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="user-profile">
          <table className="user-details">
            <tbody>
              <tr></tr>
              <tr>
                <td>
                  <p className="user-label">NAME:</p>
                </td>
                <td>
                  <p className="user-value">{profile.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="user-label">EMAIL:</p>
                </td>
                <td>
                  <p className="user-value">{profile.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="user-label">PHONE:</p>
                </td>
                <td>
                  <p className="user-value">{profile.phone}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="user-label">Date of Birth:</p>
                </td>
                <td>
                  <p className="user-value">{profile.dateOfBirth}</p>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <p className="user-label">Username:</p>
                </td>
                <td>
                  <p className="user-value">{profile.user.username}</p>
                </td>
              </tr> */}
            </tbody>
            <div className="bt">
              {" "}
              <button className="btn btn-primary" onClick={handleBack}>
                Back
              </button>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
