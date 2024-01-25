import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewBookingDetails = ({ hotelId }) => {
  const [bookingList, setBookingList] = useState([]);
  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/bookingsByHotelId/${hotelId}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((response) => setBookingList(response.data));
  }, [hotelId, token]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Hotel</TableCell> */}
              <TableCell>Hotel Name</TableCell>
              {/* <TableCell>Hotel Email</TableCell>
            <TableCell>Hotel Contact</TableCell> */}
              <TableCell>Booking Id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Contact</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Total Room</TableCell>
              {/* <TableCell>Total Day</TableCell> */}
              <TableCell>Total Payable Amount</TableCell>
              <TableCell>Booking Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingList.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell>{row.hotel}</TableCell> */}
                <TableCell>{row.room.hotel.name}</TableCell>
                {/* <TableCell>{row.hotelEmail}</TableCell>
          <TableCell>{row.hotelContact}</TableCell> */}
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer.name}</TableCell>
                <TableCell>{row.customer.phone}</TableCell>
                <TableCell>{row.check_in}</TableCell>
                <TableCell>{row.check_out}</TableCell>
                <TableCell>{row.numberOfRooms}</TableCell>
                {/* <TableCell>{row.totalDay}</TableCell> */}
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.bookingStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ViewBookingDetails;
