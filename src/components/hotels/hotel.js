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
    width: "300px",
    height: "400px",
  };

  const cardBodyStyle = {
    height: "90%",
  };

  const reviewStyle = {
    height: "100%",
    overflow: "auto",
  };

  return (
    <div
      style={{
        backgroundImage: "url(/h5.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div>
        <NavbarComponent />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <SearchHotels />
        </div>
        <div
          className="d-flex  
                        justify-content-center vh-100"
        >
          <div className="row">
            {hotels.map(({ name, address, id, email, phone_number }, index) => (
              <div key={index} className="col-md-4 mb-4">
                <Card style={cardStyle}>
                  <Tabs defaultActiveKey="hotels" id="tabs">
                    <Tab eventKey="hotels" title="Hotels">
                      <div className="card-body">
                        <HotelDetails
                          name={name}
                          address={address}
                          email={email}
                          phone_number={phone_number}
                        />
                      </div>
                    </Tab>
                    <Tab eventKey="room" title="Rooms">
                      <div className="card-body">
                        <RoomDetails hotelId={id} location={location} />
                      </div>
                    </Tab>
                    <Tab eventKey="reviews" title="Reviews">
                      <div className="card-body" style={reviewStyle}>
                        <Reviews idForHotel={id} />
                      </div>
                    </Tab>
                  </Tabs>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel;
