import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

export const RoomDetails = ({ hotelId, location }) => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/rooms/getByHotel/${hotelId}`)
      .then((response) => setRooms(response.data));
  }, [hotelId]);

  const handleBooking = (roomId) => {
    localStorage.setItem("roomId", roomId);
    const isLoggedIn = localStorage.getItem("isLoggedIn") ?? false;
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: `/hotel/${location}/book/${hotelId}/room/${roomId}`,
        },
      });
    } else {
      navigate(`/hotel/${location}/book/${hotelId}/room/${roomId}`);
    }
  };

  return (
    <>
      {rooms.map(({ room_type, price, id }) => (
        <>
          <Card.Title>Room Type: {room_type}</Card.Title>
          <Card.Text>
            Price: {price}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Button variant="primary" onClick={() => handleBooking(id)}>
              Book
            </Button>
          </Card.Text>
        </>
      ))}
    </>
  );
};
