import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { message } from "antd";

const AddRoom = ({ hotelId }) => {
  //const [hotelId, setHotelId] = useState('');
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [avalaibleRooms, setAvalaibleRooms] = useState("");
  const [rooms, setRooms] = useState("");

  const [param] = useSearchParams();
  //const { hotelId } = localStorage.getItem("hotelId");

  const navigate = useNavigate();

  const handleTypeChange = (value) => {
    setRoomType(value);
  };
  const handlePriceChange = (value) => {
    setPrice(parseFloat(value));
  };

  const handleAvilChange = (value) => {
    setAvalaibleRooms(parseInt(value));
  };

  const handleSave = () => {
    // axios
    //   .post("http://localhost:8083/feelhome/room/add/" + param.get("hid"), {
    //     HotelId: hotelId,
    //     room_type: roomType,
    //     price: price,
    //     totalRooms: avalaibleRooms,
    //   })
    //   .then((res) => {
    //     setRooms(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    const data = {
      room_type: roomType,
      price: price,
      totalRooms: avalaibleRooms,
    };
    console.log(hotelId);
    axios
      .post(`http://localhost:8083/feelhome/room/add/${hotelId}`, data)
      .then((result) => {
        message.success("room  added");
        navigate("/AdminDashboard");
      }, [])
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <>
      <div className="card">Add Room</div>
      <label>RoomType</label>
      <input
        type="text"
        name="RoomType"
        className="form-control"
        id="RoomType"
        placeholder="Enter the room type"
        onChange={(e) => handleTypeChange(e.target.value)}
      />{" "}
      <br></br>
      {/* <div className="form-group"> */}
      <label>Price</label>
      <input
        type="text"
        name="Price"
        className="form-control"
        id="Price"
        placeholder="Enter the price"
        onChange={(e) => handlePriceChange(e.target.value)}
      />{" "}
      <br></br>
      {/* </div> */}
      {/* <div className="form-group"> */}
      <label>Available Rooms</label>
      <input
        type="text"
        name="AvalaibleRooms"
        className="form-control"
        id="AvalaibleRooms"
        placeholder="Enter the avilabile rooms"
        onChange={(e) => handleAvilChange(e.target.value)}
      />{" "}
      <br></br>
      {/* </div> */}
      <button class="btn btn-primary" onClick={() => handleSave()}>
        Save
      </button>
    </>
  );
};

export default AddRoom;
