import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ViewBookingDetails from "./viewBookingDetails";
import AddRoomDetails from "./addroom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ViewRooms } from "./viewrooms";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

function AdminDashboard() {
  const [param] = useSearchParams();
  const navigate = useNavigate();
  const adminId = localStorage.getItem("id");
  const [hotel, setHotel] = useState("");
  localStorage.setItem("hotelId", hotel.id);
  console.log(localStorage.getItem("hotelId"));

  useEffect(() => {
    axios
      .get(`http://localhost:8083/hotel/getbyAdmin/${adminId}`)
      .then((response) => setHotel(response.data))
      .catch((e) => console.log(e));
  }, [adminId]);
  const process = () => {
    if (param.get("page") === `ViewallBookings/${hotel.id}`) {
      return (
        <div>
          <ViewBookingDetails hotelId={hotel.id} />
        </div>
      );
    }

    if (param.get("page") === "addroom") {
      return (
        <div>
          <AddRoomDetails hotelId={hotel.id} />
        </div>
      );
    }

    if (param.get("page") === `viewrooms/${hotel.id}`) {
      return (
        <div>
          <ViewRooms hotelId={hotel.id} />
        </div>
      );
    }
  };

  function clearLocalStorage() {
    localStorage.clear();
  }

  const menuItems = [
    {
      key: "my-profile",
      label: <Link to="/AdminProfile">My Profile</Link>,
    },
    {
      key: "logout",
      label: (
        <Link onClick={() => clearLocalStorage()} to="/login">
          Logout
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>FEEL HOME</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link
              onClick={() =>
                navigate(`/AdminDashboard?page=ViewallBookings/${hotel.id}`)
              }
            >
              View all Bookings
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/AdminDashboard?page=addroom")}>
              Add Room
            </Nav.Link>
            <Nav.Link
              onClick={() =>
                navigate(`/AdminDashboard?page=viewrooms/${hotel.id}`)
              }
            >
              View Rooms
            </Nav.Link>
          </Nav>
        </Container>
        <React.Fragment>
          <Navbar.Text>
            Signed in as:{" "}
            <span style={{ color: "white" }}>
              {localStorage.getItem("username")}
            </span>
          </Navbar.Text>
          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </React.Fragment>
      </Navbar>
      {process()}
    </div>
  );
}
export default AdminDashboard;
