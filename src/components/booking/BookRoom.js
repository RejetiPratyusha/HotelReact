import { useEffect, useState } from "react";
import Login from "../login/login";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";

function BookRoom() {
    const [booking, setBooking] = useState([]);
    const [param] = useSearchParams();
    const [customerId, setCustomerId] = useState();

    if(localStorage.getItem('isLoggedIn') === null){
        return <div>
           <Login />
        </div>
     }else{
     setCustomerId(localStorage.getItem('id'))
     return <div></div>

     }

     
     
    return (
        <div>
<NavbarComponent />
        </div>

    )
}
export default BookRoom;