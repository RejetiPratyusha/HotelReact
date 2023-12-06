import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../navbar/navbar";
import { BookingDetails } from "./booking-details";
import "./bookRoom.css";
import { useParams } from "react-router-dom";
import { FamilyDetailsForm } from "./familyDetailsForm";
import { Card } from "@material-ui/core";

function BookRoom() {
  const [booking, setBooking] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [adults, setAdults] = useState();
  const [children, setChildren] = useState();
  const [numberOfRooms, setNumberOfRooms] = useState();
  const [roomType, setRoomType] = useState("");
  const customerId = localStorage.getItem("id");

  const [hotelData, setHotelData] = useState([]);
  const [priceResponse, setPriceResponse] = useState(null);
  const [isRoomAvailable, setIsRoomAvailable] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // January is 0!
    let day = today.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };
  const { roomId, hotelId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/rooms/getByHotel/${hotelId}`)
      .then((response) => setHotelData(response.data));
  }, [hotelId]);

  const handleCheckPrice = () => {
    axios
      .post(`http://localhost:8083/feelhome/getPrice`, {
        check_in: checkIn,
        check_out: checkOut,
        numberOfRooms: numberOfRooms,
        hotelId,
        roomType,
      })
      .then((res) => {
        setPriceResponse(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    //setIsRoomAvailable(priceResponse.available);
    console.log(priceResponse);
  };

  const handleBookRooms = () => {
    axios
      .post(`http://localhost:8083/feelhome/book/${customerId}/${roomId}`, {
        check_in: checkIn,
        check_out: checkOut,
        noOfChildren: children,
        noOfAdults: adults,
        numberOfRooms: numberOfRooms,
      })
      .then((res) => {
        setBooking(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/h5.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div>
        <NavbarComponent />
      </div>
      <div>
        {booking?.id ? (
          <BookingDetails booking={booking} />
        ) : (
          <div className="app-container">
            <div class="left-column">
              <div className="card">
                <div className="card-header">
                  <h3>Room Booking</h3>
                </div>
                <div className="row " style={{ textAlign: "right" }}>
                  {/* PrePopulate values */}
                  <div className="col-md-6">
                    <label>Customer Name</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={localStorage.getItem("username")}
                    />
                  </div>

                  {/* Read Name */}
                  <div className="col-md-6">
                    <label>CheckIn:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={getCurrentDate()}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>CheckOut:</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={getCurrentDate()}
                    />
                  </div>

                  {/* Read Contact */}
                  <div className="col-md-6">
                    <label>Number Of Adults</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </div>
                  {/* {parseInt(adults)
                      ? Array.from(Array(+adults)).map((adult, index) => (
                          <>
                            <>
                              <FamilyDetailsForm /> {index}
                            </>
                          </>
                        ))
                      : null} */}

                  <div className="col-md-6">
                    <label>Number of Children</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      minLength="5"
                      maxlength="12"
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Number of Rooms</label>
                  </div>
                  <div className="col-md-6 mb-4">
                    <input
                      type="number"
                      className="form-control"
                      minLength="5"
                      r
                      maxlength="12"
                      defaultValue={1}
                      onChange={(e) => setNumberOfRooms(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label for="pet-select">Select room type:</label>
                    <select
                      name="room"
                      id="room-select"
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value="">--Please choose a room--</option>
                      {hotelData.map(({ room_type }) => (
                        <option value={room_type}>{room_type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-primary"
                    onClick={handleCheckPrice}
                  >
                    Check availability
                  </button>
                </div>
              </div>
            </div>
            {priceResponse?.available ? (
              <div class="right-column">
                <div>
                  <Card.Text>
                    <label>
                      <h6>Number of Rooms for Booking: </h6>
                    </label>
                    &nbsp;&nbsp;
                    {numberOfRooms}
                  </Card.Text>
                  <Card.Text>
                    <label>
                      <h6>CheckIn</h6>
                    </label>
                    &nbsp;&nbsp;
                    {checkIn}
                  </Card.Text>
                  {/* <Card.Text>
                    <label>
                      <h6>Total Price</h6>
                    </label>
                    &nbsp;&nbsp;
                    {isRoomAvailable.price}
                  </Card.Text> */}
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </div>
                <div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-primary"
                    onClick={handleBookRooms}
                    disabled={!isRoomAvailable}
                  >
                    Book My Room
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
export default BookRoom;
