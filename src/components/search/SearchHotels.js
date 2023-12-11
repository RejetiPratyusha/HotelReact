import axios from "axios";
import { useState, useEffect } from "react";

import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { AutoComplete, Form, DatePicker, Card, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function SearchHotels() {
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  console.log(useSearchParams());
  const { location: defaultLocation } = useParams();
  const [location, setLocation] = useState(defaultLocation);
  const [dateRange, setDateRange] = useState(
    checkIn && checkOut ? [dayjs(checkIn), dayjs(checkOut)] : []
  );
  // const [checkIn, setCheckIn] = useState(defaultCheckIn);
  // const [checkOut, setCheckOut] = useState(defaultCheckOut);

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

  // const dispatch = useDispatch();
  // let { list } = useSelector((state) => state.location);
  // useEffect(() => {
  //   dispatch(getLocations());
  // }, [dispatch]);

  const onSelect = (data) => {
    setLocation(data);
  };

  const [form] = Form.useForm();

  return (
    <Card title="Search hotels">
      <Form
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Form.Item name="location">
          <AutoComplete
            style={{ width: 200 }}
            options={locationsList}
            placeholder="search location"
            filterOption={(inputValue, option) =>
              option.value.toLowerCase().includes(inputValue.toLowerCase())
            }
            onSelect={onSelect}
            value={location}
            defaultValue={defaultLocation}
          />
        </Form.Item>
        <RangePicker
          style={{ margin: "0 20px" }}
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
          format="DD-MM-YYYY"
          placeholder={["Check in", "Check out"]}
          disabledDate={(current) => current < dayjs()}
          // defaultValue={
          //   defaultCheckIn && defaultCheckOut
          //     ? [dayjs(defaultCheckIn), dayjs(defaultCheckOut)]
          //     : []
          // }
        />
        <Button
          type="primary"
          style={{
            margin: "20px 0",
          }}
          onClick={() =>
            navigate({
              pathname: `/hotel/${location}`,
              search: createSearchParams({
                checkIn: dateRange[0].format("YYYY-MM-DD"),
                checkOut: dateRange[1].format("YYYY-MM-DD"),
              }).toString(),
            })
          }
        >
          Search
        </Button>
      </Form>
    </Card>
  );
}

export default SearchHotels;
