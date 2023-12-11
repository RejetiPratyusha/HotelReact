import React, { useState } from "react";
import { Collapse, Button, Rate, Modal } from "antd";
import { RoomDetails } from "./room-details";
import { Reviews } from "./reviews";

export const HotelDetails = ({ hotel = {} }) => {
  const { name, address, phone_number, email, id } = hotel;
  const items = [
    {
      key: "1",
      label: name,
      children: (
        <>
          <h6>Address:</h6>
          <p>{address}</p>
          <br />
          <h6>Contact:</h6>
          <p>{phone_number}</p>
          <h6>Email:</h6>
          <p>{email}</p>
        </>
      ),
    },
    {
      key: "2",
      label: "Rooms",
      children: <RoomDetails hotelId={id} />,
    },
    {
      key: "3",
      label: "Reviews",
      children: <Reviews hotelId={id} />,
    },
  ];
  return (
    <Collapse
      defaultActiveKey={["1"]}
      style={{
        flexGrow: 1,
        alignSelf: "flex-start",
      }}
      items={items}
    />
  );
};
