import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./hotel.css";
import NavbarComponent from "../navbar/navbar";
import { HotelDetails } from "./hotel-details";
import SearchHotels from "../search/SearchHotels";

function Hotel() {
  const [hotels, setHotels] = useState([]);
  const { location } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/hotel/getAllByLocationName/${location}`)
      .then((response) => setHotels(response.data));
  }, [location]);

  return (
    <div>
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
