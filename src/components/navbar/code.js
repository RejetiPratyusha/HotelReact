import React, { useState } from "react";
import { Collapse, Button, Rate, Modal } from "antd";
import "./style.css";

const hotels = [
  {
    id: 35,
    name: "The Accord Metropolitan",
    address:
      "35 G.N Chetty Road, Thiyagara Nagar, Tamil Nadu, T - Nagar, 600017 Chennai",
    email: "accord@gmail.com",
    phone_number: "9965778788",
  },
  {
    id: 35,
    name: "The Accord Metropolitan",
    address:
      "35 G.N Chetty Road, Thiyagara Nagar, Tamil Nadu, T - Nagar, 600017 Chennai",
    email: "accord@gmail.com",
    phone_number: "9965778788",
  },
  {
    id: 35,
    name: "The Accord Metropolitan",
    address:
      "35 G.N Chetty Road, Thiyagara Nagar, Tamil Nadu, T - Nagar, 600017 Chennai",
    email: "accord@gmail.com",
    phone_number: "9965778788",
  },
  {
    id: 35,
    name: "The Accord Metropolitan",
    address:
      "35 G.N Chetty Road, Thiyagara Nagar, Tamil Nadu, T - Nagar, 600017 Chennai",
    email: "accord@gmail.com",
    phone_number: "9965778788",
  },
];

const rooms = [
  {
    id: 40,
    room_type: "Premiun_Suite",
    price: 17500.0,
    totalRooms: 4,
  },
  {
    id: 40,
    room_type: "Premiun_Suite",
    price: 17500.0,
    totalRooms: 4,
  },
  {
    id: 40,
    room_type: "Premiun_Suite",
    price: 17500.0,
    totalRooms: 4,
  },
  {
    id: 40,
    room_type: "Premiun_Suite",
    price: 17500.0,
    totalRooms: 4,
  },
];

const reviews = [
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful1",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful2",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful3",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful1",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful2",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful3",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful",
    date: "2023-12-05",
  },
  {
    id: 68,
    rating: 4,
    comments: "Neat, Clean and Peaceful",
    date: "2023-12-05",
  },
];

const Reviews = ({ reviews = [] }) => {
  const [showMore, setShowMore] = useState(false);
  const reviewsToShow = reviews.slice(0, 2);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {reviewsToShow.map(({ comments, rating }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
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
          {reviews.map(({ rating, comments }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
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

const Rooms = ({ rooms = [] }) => {
  return rooms.map(({ room_type, price }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{room_type}</p>
      <p>Rs. {price} /-</p>
      <Button>Book now</Button>
    </div>
  ));
};

const Hotels = ({ hotel = {} }) => {
  const { name, address, phone_number, email } = hotel;
  const items = [
    {
      key: "1",
      label: name,
      children: (
        <>
          <p>{address}</p>
          <p>{phone_number}</p>
          <p>{email}</p>
        </>
      ),
    },
    {
      key: "2",
      label: "Rooms",
      children: <Rooms rooms={rooms} />,
    },
    {
      key: "3",
      label: "Reviews",
      children: <Reviews reviews={reviews} />,
    },
  ];
  return (
    <Collapse
      defaultActiveKey={["1"]}
      style={{
        flexGrow: 1,
        alignSelf: "flex-start",
      }}
      items={items}
    />
  );
};

const ShowMoreReviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default function App() {
  return hotels.map((hotel) => (
    <div
      style={{
        margin: "20px 0",
        display: "flex",
      }}
    >
      <img
        src="https://picsum.photos/220/300"
        alt={hotel.name}
        style={{
          borderRadius: "10px",
          border: "1px solid #ccc",
          margin: "0 20px",
        }}
        height={300}
      />
      <Hotels hotel={hotel} />
    </div>
  ));
}
