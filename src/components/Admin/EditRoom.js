import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export const EditRoom = ({ roomDetails = {} }) => {
  const {
    room_type: defaultRoomType,
    price: defaultPrice,
    totalRooms: defaultTotalRooms,
  } = roomDetails;
  //const [hotelId, setHotelId] = useState('');
  const [roomType, setRoomType] = useState(defaultRoomType);
  const [price, setPrice] = useState(defaultPrice);
  const [avalaibleRooms, setAvalaibleRooms] = useState(defaultTotalRooms);

  const navigate = useNavigate();

  const { hotelId } = localStorage.getItem("hotelId");

  const handleTypeChange = (value) => {
    setRoomType(value);
  };
  const handlePriceChange = (value) => {
    setPrice(parseFloat(value));
  };

  const handleAvilChange = (value) => {
    setAvalaibleRooms(parseInt(value));
  };

  const handleUpdate = () => {
    const data = {
      room_type: roomType,
      price: price,
      totalRooms: avalaibleRooms,
    };
    console.log(hotelId);
    axios
      .post(`http://localhost:8083/feelhome/room/update/${hotelId}`, data)
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
      <button class="btn btn-primary" onClick={() => handleUpdate()}>
        Update
      </button>
    </>
  );
};

export default EditRoom;
