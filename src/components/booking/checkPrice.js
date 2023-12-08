import { Card } from "react-bootstrap";

export const CheckPrice = ({ numberOfRooms, checkIn, isRoomAvailable }) => {
  return (
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
      <Card.Text>
        <label>
          <h6>Total Price</h6>
        </label>
        &nbsp;&nbsp;
        {isRoomAvailable.price}
      </Card.Text>
    </div>
  );
};
