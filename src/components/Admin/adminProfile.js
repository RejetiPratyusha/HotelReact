import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "../navbar/navbar";
import { useNavigate } from "react-router";

const AdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState("");
  const adminId = localStorage.getItem("id");
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8083/hoteladmin/getadmin/${adminId}`)
      .then((response) => setAdminProfile(response.data));
  }, [adminId]);

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
                  <p className="user-value">{adminProfile.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="user-label">EMAIL:</p>
                </td>
              <td>
                  <p className="user-value">{adminProfile.email}</p>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <p className="user-label">PHONE:</p>
                </td>
                <td>
                  <p className="user-value">{adminProfile.phone}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="user-label">Date of Birth:</p>
                </td>
                <td>
                  <p className="user-value">{adminProfile.dateOfBirth}</p>
                </td>
              </tr> 
             <tr>
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

export default AdminProfile;
