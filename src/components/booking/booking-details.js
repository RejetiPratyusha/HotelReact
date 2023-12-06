import { Card } from "react-bootstrap";

export function BookingDetails({ booking }) {
  return (
    <div>
      <div
        className="d-flex align-items-center  
                        justify-content-center vh-100"
      >
        <Card>
          <Card.Title>Room Booked Successfully</Card.Title>
          <Card.Text>Booking Id: {booking.id}</Card.Text>
          <Card.Text>Total Price: {booking.totalPrice}</Card.Text>
          <Card.Text>CheckIn: {booking.check_in}</Card.Text>
          <Card.Text>CheckOut: {booking.check_out}</Card.Text>
          <Card.Text>Number of Adults: {booking.noOfAdults}</Card.Text>
          <Card.Text>Number of Children: {booking.noOfChildren}</Card.Text>
          <Card.Text>Booking Status: {booking.bookingStatus}</Card.Text>
          <Card.Text>Number of Rooms Booked: {booking.numberOfRooms}</Card.Text>
        </Card>
      </div>
    </div>
  );
}

export default BookingDetails;
