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
import { Button, Input, Modal, Rate } from "antd";
import { useCallback } from "react";
import { Form } from "react-router-dom";

export const CustomerBookingDetails = () => {
  const [customerBookingList, setcustomerBookingList] = useState([]);
  const customerId = localStorage.getItem("id");
  const [isReview, setIsReviewed] = useState(false);

  const getBookingList = useCallback(() => {
    axios
      .get(`http://localhost:8083/feelhome/booking/${customerId}`)
      .then((response) => setcustomerBookingList(response.data));
  }, [customerId]);

  useEffect(() => {
    getBookingList();
  }, [customerId, getBookingList]);

  const handleCancelBooking = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:8083/feelhome/booking/cancel/${id}`)
      .then((response) => {
        console.log(response.data);
        getBookingList();
      });
  };

  // const handleAddReview = (hotel, values) => {
  //   console.log(values);
  //   // localhost:8083/feedback/194/32
  //   const { rating, comments } = values;
  //   axios
  //     .put(
  //       `http://localhost:8083/feelhome/booking/update/${customerId}/${hotel.id}`,
  //       {
  //         rating: rating,
  //         comments: comments,
  //       }
  //     )
  //     .then((response) => console.log(response.data));
  // };

  // const AddReview = (hotel) => {
  //   return (
  //     <Modal
  //       title="Reviews"
  //       open={isReview}
  //       onCancel={() => setIsReviewed(false)}
  //       width={1000}
  //       footer={null}
  //     >
  //       <Form
  //         name="basic"
  //         labelAlign="left"
  //         labelCol={{
  //           span: 8,
  //         }}
  //         wrapperCol={{
  //           span: 16,
  //         }}
  //         style={{
  //           maxWidth: 600,
  //         }}
  //         onFinish={handleAddReview(hotel)}
  //         autoComplete="off"
  //         initialValues={{
  //           cName: localStorage.getItem("username"),
  //         }}
  //       >
  //         <Form.Item
  //           label="Customer name"
  //           name="cName"
  //           rules={[
  //             {
  //               required: true,
  //               message: "Please enter your name!",
  //             },
  //           ]}
  //         >
  //           <Input />
  //         </Form.Item>

  //         <Form.Item label="RATING" name="rating">
  //           <Rate />
  //         </Form.Item>

  //         <Form.Item
  //           wrapperCol={{
  //             offset: 8,
  //             span: 16,
  //           }}
  //         >
  //           <Form.Item label="Comments" name="comments">
  //             <Input />
  //           </Form.Item>
  //           <Button type="primary" htmlType="submit">
  //             Add Review
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     </Modal>
  //   );
  // };

  const getActions = (bookingStatus, id, hotel) => {
    if (bookingStatus === "BOOKED") {
      return (
        <Button onClick={() => handleCancelBooking(id)}>Cancel booking</Button>
      );
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
                <TableCell>
                  {getActions(row.bookingStatus, row.id, row.room.hotel)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
