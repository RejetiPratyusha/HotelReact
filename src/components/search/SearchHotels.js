import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { AutoComplete, Form, DatePicker } from "antd";
import { dayjs } from "dayjs";

const { RangePicker } = DatePicker;

function SearchHotels() {
  // const { checkIn: defaultCheckIn = "", checkOut: defaultCheckOut = "" } =
  //   useSearchParams();
  // console.log(useSearchParams());
  const { location: defaultLocation } = useParams();
  const [location, setLocation] = useState(defaultLocation);
  // const [dateRange, setDateRange] = useState([
  //   dayjs(defaultCheckIn),
  //   dayjs(defaultCheckOut),
  // ]);
  // const [checkIn, setCheckIn] = useState(defaultCheckIn);
  // const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [locationsList, setLocationsList] = useState([]);

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
            alignItems: "center",
            height: "15vh",
          }}
        >
          <Row
            style={{ height: "10vh", marginTop: "20px", marginLeft: "30px" }}
          >
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
                    value={location}
                  />
                </Form.Item>
                {/* <RangePicker
                  onChange={(dates, dateString) => {
                    setDateRange(dates);
                    setCheckIn(dateString[0]);
                    setCheckOut(dateString[1]);
                  }}
                  value={dateRange}
                /> */}
              </Form>
            </Col>
            <Col xs="auto">
              <label style={{ marginRight: "10px" }}>checkIn: </label>
              <input
                type="date"
                placeholder="CheckIn"
                className=" mr-sm-2"
                onChange={(e) => setCheckIn(e.target.value)}
                min={getCurrentDate()}
                value={checkIn}
              />
            </Col>
            <Col xs="auto">
              <label style={{ marginRight: "10px" }}>checkOut: </label>
              <input
                type="date"
                placeholder="CheckOut"
                className=" mr-sm-2"
                onChange={(e) => {
                  console.log(e.target.value);
                  setCheckOut(e.target.value);
                }}
                min={getCurrentDate()}
                value={checkOut}
              />
            </Col>

            <row>
              <Col
                xs="auto"
                style={{ margin: "auto", justifycontent: " center" }}
              >
                <button
                  className="btn btn-primary"
                  style={{
                    alignItems: "center",
                  }}
                  onClick={() =>
                    navigate({
                      pathname: `/hotel/${location}`,
                      search: createSearchParams({
                        checkIn,
                        checkOut,
                      }).toString(),
                    })
                  }
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
