import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Nav } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";

function Room(props) {
    const [room, setRoom] = useState([]);
    const [param] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(props.strVal !== ''){
            axios.get('http://localhost:8083/feelhome/rooms/getByHotel/' +props.strVal)
            .then(response => setRoom(response.data))
          }
        
    }, [props.strVal])
    return (
        

        <div >
            <div className="row">
                <div >
                    <NavbarComponent />
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {room.map((r, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <Card
                                    style={{
                                        width: "18rem",
                                        height: "12rem",
                                    }}
                                >
                                    {/* <img alt="Sample" src="https://picsum.photos/300/200" /> */}
                                    <img src="/h3.jpg" ></img>
                                    <CardBody>
                                        <CardTitle tag="h5">{r.room_type}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                        <p> Price: INR. {r.price}</p>
                                        </CardSubtitle>

                                        <Button variant="primary" onClick={()=>navigate("/booking/BookRoom?roomId=" +r.id)}>Book Room</Button>
                                    </CardBody>
                                </Card>
                                <Nav.Link> </Nav.Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Room;