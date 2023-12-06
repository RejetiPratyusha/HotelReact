import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Hotel from "./components/hotels/hotel";
import BookRoom from "./components/booking/BookRoom";
import CustomerDashboard from "./components/customer/customerDashboard";
import ExecutiveDashboard from "./components/Executive/executiveDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import HrDashboard from "./components/Hr/HrDashboard";
import BookingDetails from "./components/booking/booking-details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/hotel/:location" element={<Hotel />} />
        <Route
          path="/hotel/:location/book/:hotelId/room/:roomId"
          element={<BookRoom />}
        />
        <Route
          path="/customer/customerDashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/Executive/executiveDashboard"
          element={<ExecutiveDashboard />}
        ></Route>
        <Route
          path="/Admin/AdminDashboard"
          element={<AdminDashboard />}
        ></Route>
        <Route path="/Hr/HrDashboard" element={<HrDashboard />}></Route>
        <Route
          path="/booking/booking-details"
          element={<BookingDetails />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
