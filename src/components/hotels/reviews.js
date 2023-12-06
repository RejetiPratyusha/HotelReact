import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export const Reviews = ({ idForHotel }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feedbackForHotel/${idForHotel}`)
      .then((response) => setReviews(response.data)).catch((e)=> {console.log(e)})
  }, [idForHotel]);

  

  return (
    <>
      {reviews.map(({ rating, comments, id }) => (
        <>
          <Card.Title>{rating}</Card.Title>
          <Card.Text>{comments}</Card.Text>
        </>
      ))}
    </>
  );
};
