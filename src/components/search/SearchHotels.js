import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AutoComplete, Form } from "antd";

function SearchHotels() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [locationsList, setLocationsList] = useState([]);

  console.log(locationsList);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8083/feelhome/getalllocations")
      .then((res) => {
        const options = res.data.map(({ name }) => ({ value: name }));
        setLocationsList(options);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // January is 0!
    let day = today.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const onSelect = (data) => {
    setLocation(data);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <div>
        <div
          className="card"
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <Row style={{ height: "10vh" }}>
            <Col xs="auto">
              <Form form={form}>
                <Form.Item label="Location">
                  <AutoComplete
                    style={{ width: 200 }}
                    options={locationsList}
                    placeholder="search location"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={onSelect}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col xs="auto">
              <label>checkIn: </label>
              <input
                type="date"
                placeholder="CheckIn"
                className=" mr-sm-2"
                onChange={(e) => setCheckIn(e.target.value)}
                min={getCurrentDate()}
              />
            </Col>
            <Col xs="auto">
              <label>checkOut: </label>
              <input
                type="date"
                placeholder="CheckOut"
                className=" mr-sm-2"
                onChange={(e) => setCheckOut(e.target.value)}
                min={getCurrentDate()}
              />
            </Col>

            <row>
              <Col xs="auto">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/hotel/${location}`)}
                >
                  search
                </button>
              </Col>
            </row>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default SearchHotels;
