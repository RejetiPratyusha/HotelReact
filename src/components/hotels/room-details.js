import axios from "axios";
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Button, Rate, Modal } from "antd";

export const RoomDetails = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();
  const { location } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/rooms/getByHotel/${hotelId}`)
      .then((response) => setRooms(response.data));
  }, [hotelId]);

  const handleBooking = (roomId, room_type) => {
    localStorage.setItem("roomId", roomId);
    const isLoggedIn = localStorage.getItem("isLoggedIn") ?? false;
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `/hotel/${location}/book/${hotelId}/room/${roomId}`,
          checkIn: searchParams.get("checkIn"),
          checkOut: searchParams.get("checkOut"),
          roomType: room_type,
        },
      });
    } else {
      navigate({
        pathname: `/hotel/${location}/book/${hotelId}/room/${roomId}`,
        search: createSearchParams({
          checkIn: searchParams.get("checkIn"),
          checkOut: searchParams.get("checkOut"),
          roomType: room_type,
        }).toString(),
      });
    }
  };

  return rooms.map(({ room_type, price, id }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{room_type}</p>
      <p>Rs. {price} /-</p>
      <Button onClick={() => handleBooking(id, room_type)}>Book now</Button>
    </div>
  ));
};
