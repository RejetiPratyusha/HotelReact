import React from "react";
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

const { RangePicker } = DatePicker;
const { Option } = Select;

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

const hotel = {
  id: 35,
  name: "The Accord Metropolitan",
  address:
    "35 G.N Chetty Road, Thiyagara Nagar, Tamil Nadu, T - Nagar, 600017 Chennai",
  email: "accord@gmail.com",
  phone_number: "9965778788",
};

const price = {
  price: 1500.0,
  totalBookingPrice: 1680.0,
  availableRooms: 2,
  numberOfDays: 1,
  cgst: 6.0,
  sgst: 6.0,
  available: true,
};

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

const BookingVerifyDetails = () => {
  const {
    availableRooms,
    cgst,
    sgst,
    numberOfDays,
    price: priceBeforeTax,
    totalBookingPrice,
  } = price;

  return (
    <Card title="Please verify your booking details">
      <CardFlexItem title="Number of Days" info={numberOfDays} />
      <CardFlexItem title="Number of Rooms" info={availableRooms} />
      <Divider />
      <CardFlexItem title="Price" info={`Rs. ${priceBeforeTax}`} />
      <CardFlexItem title="CGST" info={`Rs. ${cgst}`} />
      <CardFlexItem title="SGST" info={`Rs. ${sgst}`} />
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
          htmlType="submit"
        >
          Continue with payment
        </Button>
      </div>
    </Card>
  );
};

export const BookingForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <HotelBookingDetails hotel={hotel} />
      <Card title="Booking Details">
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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            guests: [
              {
                name: "",
                idProof: "",
              },
            ],
          }}
        >
          <Form.Item
            label="Customer name"
            name="name"
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
              {rooms.map(({ room_type, price }) => (
                <Option key={room_type} value={room_type}>
                  {room_type} - Rs.{price}/-
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of rooms"
            name="noOfRooms"
            rules={[
              {
                required: true,
                message: "Please select no. of rooms!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          {/* <Form.Item
        label="Number of adults"
        name="noOfAdults"
        rules={[
          {
            required: true,
            message: 'Please select no. of adults!',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item> */}

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
                      <Select placeholder="Select ID proof">
                        <Option key="PAN" value="PAN">
                          Pan card
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
        {!price.available && price.availableRooms ? (
          <p
            style={{
              color: "red",
            }}
          >
            Current number of rooms available are less than the requested number
            of rooms. Please try decreasing "Number of rooms".
          </p>
        ) : null}
      </Card>
      <BookingVerifyDetails />
    </>
  );
};
