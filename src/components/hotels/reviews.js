import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export const Reviews = ({ idForHotel }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feedbackForHotel/${idForHotel}`)
      .then((response) => setReviews(response.data))
      .catch((e) => {
        console.log(e);
      });
  }, [idForHotel]);

  return (
    <>
      {reviews.map(({ rating, comments, id, customer }) => (
        <>
          <Card.Title>
            <label>Customer Name:</label>
            &nbsp;&nbsp;
            {customer.name}
          </Card.Title>
          <Card.Text>
            <label>
              <h6>Rating: </h6>
            </label>
            &nbsp;&nbsp;
            {rating}
          </Card.Text>
          <Card.Text>
            <label>
              <h6>comments:</h6>
            </label>
            &nbsp;&nbsp;
            {comments}
            <hr></hr>
          </Card.Text>
        </>
      ))}
    </>
  );
};
