
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Hotel from './components/hotels/hotel';
import Room from './components/rooms/room';
import BookRoom from './components/booking/BookRoom';
import CustomerDashboard from './components/customer/customerDashboard';
import ExecutiveDashboard from './components/Executive/executiveDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import HrDashboard from './components/Hr/HrDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/home/home" element={<Home/>}></Route>
        <Route path="/login/login" element={<Login/>}></Route>
        <Route path="/signup/signup" element={< Signup />} />
         <Route path="/hotels/hotel" element={<Hotel/>}></Route>
         <Route path="/rooms/room" element={<Room />} />
         <Route path="/hotels/room" element={<Room />} />
         <Route path="/booking/BookRoom" element={<BookRoom/>} > </Route>
         <Route path="/customer/customerDashboard" element={<CustomerDashboard/>} > </Route>
         <Route path="/Executive/executiveDashboard" element={<ExecutiveDashboard/>} > </Route>
         <Route path="/Admin/AdminDashboard" element={<AdminDashboard/>} > </Route>
         <Route path="/Hr/HrDashboard" element={<HrDashboard/>} > </Route>
         
          
        </Routes>
    </div>
  );
}

export default App;
