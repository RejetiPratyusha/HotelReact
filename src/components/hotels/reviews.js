import axios from "axios";
import React, { useState, useEffect } from "react";
import { Collapse, Button, Rate, Modal } from "antd";
import { Card } from "react-bootstrap";

export const Reviews = ({ hotelId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feedbackForHotel/${hotelId}`)
      .then((response) => setReviews(response.data))
      .catch((e) => {
        console.log(e);
      });
  }, [hotelId]);

  const [showMore, setShowMore] = useState(false);
  const reviewsToShow = reviews.slice(0, 2);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {reviewsToShow.map(({ comments, rating, customer }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <p> {customer.name}</p>
          <Rate
            style={{
              margin: "0 20px",
            }}
            disabled
            defaultValue={+rating}
          />
          <p>{comments}</p>
        </div>
      ))}
      <Modal
        title="Reviews"
        open={showMore}
        onCancel={() => setShowMore(false)}
        width={1000}
        footer={null}
      >
        <div
          style={{
            height: "400px",
            overflow: "auto",
          }}
        >
          {reviews.map(({ rating, comments, customer }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <p> {customer.name}</p>
              <Rate
                style={{
                  margin: "0 30px",
                }}
                disabled
                defaultValue={+rating}
              />

              <p
                style={{
                  margin: "30px",
                }}
              >
                {comments}
              </p>
            </div>
          ))}
        </div>
      </Modal>
      {reviews.length > 2 ? (
        <Button variant="text" onClick={() => setShowMore(true)}>
          Show more
        </Button>
      ) : null}
    </div>
  );
};
