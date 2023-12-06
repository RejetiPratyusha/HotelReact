import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";

export const HotelDetails = ({ name, address, email, phone_number }) => (
  <>
    <Card.Title>
      <label>Hotel Name:</label>
      &nbsp;&nbsp;
      {name}
    </Card.Title>
    <Card.Text>
      <label>
        <h6>Address: </h6>
      </label>
      &nbsp;&nbsp;
      {address}
    </Card.Text>
    <Card.Text>
      <label>
        <h6>Email: </h6>
      </label>
      &nbsp;&nbsp;
      {email}
    </Card.Text>
    <Card.Text>
      <label>
        <h6>phone_number: </h6>
      </label>
      &nbsp;&nbsp;
      {phone_number}
    </Card.Text>
    {/* <Button variant="primary">Go somewhere</Button> */}
  </>
);
