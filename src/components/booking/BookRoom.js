import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../navbar/navbar";
import { BookingDetails } from "./booking-details";
import "./bookRoom.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FamilyDetailsForm } from "./familyDetailsForm";
import { HotelDetails } from "../hotels/hotel-details";
import { CheckPrice } from "./checkPrice";
import { Splitter, SplitterPanel } from "primereact/splitter";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Upload,
  Card,
  Divider,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HotelBookingDetails = ({ hotel = {} }) => {
  const { name: hotelName, address, phone_number, email } = hotel;

  return (
    <Card
      title={hotelName}
      style={{
        margin: "20px 0",
      }}
    >
      <p>
        <b>Address: </b>
        {address}
      </p>
      <p>
        <b>Phone:</b> {phone_number}
      </p>
      <p>
        <b>Email: </b>
        {email}
      </p>
    </Card>
  );
};

const CardFlexItem = ({ title, info }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <b>{title}</b>
    <p>{info}</p>
  </div>
);

const BookingVerifyDetails = ({ price = {}, handleBookRooms }) => {
  const {
    availableRooms,
    cgst,
    sgst,
    numberOfDays,
    price: priceBeforeTax,
    totalBookingPrice,
    gstPrice,
  } = price;

  return (
    <Card title="Please verify your booking details">
      <CardFlexItem title="Number of Days" info={numberOfDays} />
      <CardFlexItem title="Number of Rooms" info={availableRooms} />
      <Divider />
      <CardFlexItem title="Price" info={`Rs. ${priceBeforeTax}`} />
      <CardFlexItem title="CGST" info={`${cgst}% ----> Rs. ${gstPrice} `} />
      <CardFlexItem title="SGST" info={`${sgst}% ----> Rs. ${gstPrice}`} />
      <Divider />
      <b>
        <CardFlexItem title="TOTAL" info={`Rs. ${totalBookingPrice}`} />
      </b>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button
          style={{
            margin: "20px 0",
          }}
          type="primary"
          onClick={handleBookRooms}
        >
          Continue with payment
        </Button>
      </div>
    </Card>
  );
};

function BookRoom() {
  const [hotelData, setHotelData] = useState([]);
  const [hotelName, setHotelName] = useState();
  const [priceResponse, setPriceResponse] = useState(null);
  const [booking, setBooking] = useState(null);
  const [bookingFormValues, setBookingFormValues] = useState(null);

  const { roomId, hotelId } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const customerId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8083/feelhome/rooms/getByHotel/${hotelId}`)
      .then((response) => setHotelData(response.data));
  }, [hotelId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8083/hotel/getByHotel/${hotelId}`)
      .then((response) => setHotelName(response.data));
  }, [hotelId]);

  const handleCheckPrice = (values) => {
    console.log(values);

    const { dateRange, numberOfRooms, roomType } = values;
    axios
      .post(`http://localhost:8083/feelhome/getPrice`, {
        check_in: dateRange[0].format("YYYY-MM-DD"),
        check_out: dateRange[1].format("YYYY-MM-DD"),
        numberOfRooms: numberOfRooms,
        hotelId,
        roomType,
      })
      .then((res) => {
        setPriceResponse(res.data);
        if (res.data.available) {
          setBookingFormValues(values);
          console.log(bookingFormValues);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    //setIsRoomAvailable(priceResponse.available);
    console.log(priceResponse);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // const {} = bookingFormValues;

  const handleBookRooms = () => {
    const {
      dateRange,
      numberOfRooms,
      guests = [],
      noOfChildren,
    } = bookingFormValues ?? {};
    axios
      .post(`http://localhost:8083/feelhome/book/${customerId}/${roomId}`, {
        check_in: dateRange[0].format("YYYY-MM-DD"),
        check_out: dateRange[1].format("YYYY-MM-DD"),
        noOfChildren: noOfChildren,
        noOfAdults: guests?.length,
        numberOfRooms,
      })
      .then((res) => {
        setBooking(res.data);
        // navigate("/booking/booking-details");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
    // style={{
    //   backgroundImage: "url(/h5.jpg)",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   width: "100vw",
    //   height: "100vh",
    // }}
    >
      <div>
        <NavbarComponent />
      </div>
      {booking?.id ? (
        <BookingDetails booking={booking} />
      ) : (
        <Splitter
          style={{
            height: "90%",
          }}
        >
          <SplitterPanel
            className="flex align-items-center justify-content-center"
            size={75}
          >
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <HotelBookingDetails hotel={hotelName} />
              <Card
                title="Booking Details"
                style={{
                  display: "inline-grid",
                }}
              >
                <Form
                  name="basic"
                  labelAlign="left"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  onFinish={handleCheckPrice}
                  autoComplete="off"
                  initialValues={{
                    dateRange: [
                      dayjs(searchParams.get("checkIn")),
                      dayjs(searchParams.get("checkOut")),
                    ],
                    cName: localStorage.getItem("username"),
                    roomType: searchParams.get("roomType"),
                    guests: [
                      {
                        name: localStorage.getItem("username"),
                      },
                    ],
                  }}
                >
                  <Form.Item
                    label="Customer name"
                    name="cName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Check in / Check out date"
                    name="dateRange"
                    rules={[
                      {
                        required: true,
                        message: "Please select check in and check out dates!",
                      },
                    ]}
                  >
                    <RangePicker
                      format="DD-MM-YYYY"
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Room type"
                    name="roomType"
                    rules={[
                      {
                        required: true,
                        message: "Please select room type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select room type">
                      {hotelData.map(({ room_type, price }) => (
                        <Option key={room_type} value={room_type}>
                          {room_type} - Rs.{price}/-
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Number of rooms"
                    name="numberOfRooms"
                    rules={[
                      {
                        required: true,
                        message: "Please select no. of rooms!",
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  {/* Add guest sub form */}
                  <Form.List name="guests">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing name",
                                },
                              ]}
                            >
                              <Input placeholder={`Guest ${index + 1}`} />
                            </Form.Item>
                            <Form.Item
                              name={[name, "idProof"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please select ID proof!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="ID proof"
                                style={{ width: "200px" }}
                              >
                                <Option key="PAN" value="PAN">
                                  Pan card
                                </Option>
                                <Option key="Aadhar" value="Aadhar">
                                  Aadhar card
                                </Option>
                                <Option
                                  key="DrivingLicense"
                                  value="DrivingLicense"
                                >
                                  Driving License
                                </Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="upload"
                              valuePropName="fileList"
                              getValueFromEvent={normFile}
                            >
                              <Upload
                                name="logo"
                                action="/upload.do"
                                listType="picture"
                              >
                                <Button icon={<UploadOutlined />}>
                                  Upload ID proof
                                </Button>
                              </Upload>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            disabled={fields?.length === 4}
                          >
                            Add guests
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.Item label="Number of children" name="noOfChildren">
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Check availability
                    </Button>
                  </Form.Item>
                </Form>
                {!priceResponse?.available && priceResponse?.availableRooms ? (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Current number of rooms available are less than the
                    requested number of rooms. Please try decreasing "Number of
                    rooms".
                  </p>
                ) : null}
              </Card>
            </div>
          </SplitterPanel>
          <SplitterPanel
            className="flex align-items-center justify-content-center"
            size={25}
          >
            {priceResponse?.available ? (
              <BookingVerifyDetails
                price={priceResponse}
                handleBookRooms={handleBookRooms}
              />
            ) : null}
          </SplitterPanel>
        </Splitter>
      )}
    </div>
  );
}
export default BookRoom;
