import React, { useState } from "react";
import { Button, Col, Form, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

function NavbarComponent({ func }) {
  //{1,2,3,4}

  const [qStr, setQStr] = useState("");

  const menuItems = [
    {
      key: "my-profile",
      label: <p>My Profile</p>,
    },
    {
      key: "my-bookings",
      label: <p>My Bookings</p>,
    },
    {
      key: "logout",
      label: <a href="/login">Logout</a>,
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="mb-4">
      <Navbar className="mr-auto" bg="dark" data-bs-theme="dark">
        <Navbar.Brand>FEEL HOME</Navbar.Brand>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Navbar.Brand href="/" onClick={() => navigate("/")}>
          Home
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              func(qStr);
            }}
          >
            {!localStorage.getItem("isLoggedIn") ? (
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            ) : null}
          </Form>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {localStorage.getItem("isLoggedIn") ? (
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
              &nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-info btn-sm ml-4"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login?msg=you have logged out..");
                }}
              >
                Logout
              </button>
            </React.Fragment>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
