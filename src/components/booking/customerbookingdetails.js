import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import { Button } from "antd";

export const CustomerBookingDetails = () => {
  const [customerBookingList, setcustomerBookingList] = useState([]);
  const customerId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/booking/${customerId}`)
      .then((response) => setcustomerBookingList(response.data));
  }, [customerId]);

  const getActions = (bookingStatus) => {
    if (bookingStatus === "BOOKED") {
      return <Button>Cancel booking</Button>;
    }
    if (bookingStatus === "COMPLETED") {
      return <Button>Add review</Button>;
    }
    return bookingStatus;
  };

  return (
    <div>
      <NavbarComponent />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Hotel</TableCell> */}
              <TableCell>Hotel Name</TableCell>
              <TableCell>Hotel Email</TableCell>
              <TableCell>Hotel Contact</TableCell>
              <TableCell>Room TYpe</TableCell>
              <TableCell>Booking Id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Contact</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Total Room</TableCell>
              {/* <TableCell>Total Day</TableCell> */}
              <TableCell>Total Payable Amount</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerBookingList.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell>{row.hotel}</TableCell> */}
                <TableCell>{row.room.hotel.name}</TableCell>
                <TableCell>{row.room.hotel.email}</TableCell>
                <TableCell>{row.room.hotel.phone_number}</TableCell>
                <TableCell>{row.room.room_type}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer.name}</TableCell>
                <TableCell>{row.customer.phone}</TableCell>
                <TableCell>{row.check_in}</TableCell>
                <TableCell>{row.check_out}</TableCell>
                <TableCell>{row.numberOfRooms}</TableCell>
                {/* <TableCell>{row.totalDay}</TableCell> */}
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.bookingStatus}</TableCell>
                <TableCell>{getActions(row.bookingStatus)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
