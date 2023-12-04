import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./hotel.css";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Nav, NavLink, Navbar } from "react-bootstrap";
import NavbarComponent from "../navbar/navbar";
import Search from "../search/search";
import Room from "../rooms/room";

function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [param] = useSearchParams();
    const [qStr,setQStr] = useState('');
    const navigate = useNavigate();

    console.log(hotels)

    useEffect(() => {
        axios.get('http://localhost:8083/hotel/getAllByLocationName/' + param.get('location'))
            .then(response => setHotels(response.data))
    }, [])


    const searchProducts = (str)=>{
        console.log('seach func in parent comp called.....' + str)
        setQStr(str)
    }
    return (

        <div >
            <div className="mb-4" >

                <NavbarComponent />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                        <div > <Search /></div>


                        <div className="col-md-9">
                            <div className="row">
                                {hotels.map((h, index) => (
                                    <div key={index} className="col-md-4 mb-4">
                                        {/* <Card
                                    style={{
                                        width: "18rem",
                                        height: "12rem",
                                    }}
                                >
                                    
                                    <img src="/h1.jpg" ></img>
                                    <CardBody>
                                        <CardTitle tag="h5">{h.name}</CardTitle>
                                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                                            {h.address}
                                        </CardSubtitle>

                                        <Button variant="primary" onClick={() => navigate("/rooms/room?hotelId=" + h.id)}>view rooms</Button>
                                    </CardBody>
                                </Card> */}
                                        {/* <div class="card text-center">
                                            <div class="card-header">
                                                <ul class="nav nav-tabs card-header-tabs">

                                                    <li class="nav-item">
                                                        <a class="nav-link active" aria-current="true" href="#">{h.name}</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link " href='/rooms/room?hotelId=${h.id}'>Room</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link " href="review">review</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">{h.name}</h5>
                                                <p class="card-text">{h.address}</p>
                                                <a href="#" class="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div> */}
                                         <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Hotel</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#room">Room</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#disabled">Reviews</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
{hotels.map(({name, address, email}) => (
<>
<Card.Title>{name}t</Card.Title>
<Card.Text>
          {address}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
</>
))}
        {/* <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      
    </Card>
   
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
           
    )
}


export default Hotel;
