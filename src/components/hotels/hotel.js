import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import "./hotel.css";
import { Card, Tab, Tabs } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import { HotelDetails } from "./hotel-details";
import { RoomDetails } from "./room-details";
import { Reviews } from "./reviews";
import SearchHotels from "../search/SearchHotels";

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const { location } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/hotel/getAllByLocationName/${location}`)
      .then((response) => setHotels(response.data));
  }, [location]);

  const cardStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <div
    // style={{
    //   backgroundImage: "url(/hotels1.jpg)",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   backgroundPosition: "center",
    // }}
    >
      <div>
        <NavbarComponent />
        <SearchHotels />
        {hotels.map((hotel, index) => (
          <div
            style={{
              margin: "20px 0",
              display: "flex",
            }}
          >
            <img
              src={`/h${index + 1}.jpg` ?? "/h4.jpg"}
              alt={hotel.name}
              style={{
                borderRadius: "10px",
                border: "1px solid #ccc",
                margin: "0 20px",
              }}
              height={300}
            />
            <HotelDetails hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotel;
