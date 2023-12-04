import axios from "axios";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { useNavigate } from "react-router";

function Search() { //{1,2,3,4}

    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
   

    const navigate = useNavigate();

    // const divStyle = {backgroundImage:"url(Home.jpg)",
    // backgroundRepeat:'no-repeat',
    // backgroundPosition:'center',
    // width: "100vw",
    // height: "100vh",
    // backgroundSize:'cover',
    // };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        };


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
        
    return (
        
        <div className="mb-4" >
           
            <div className="container" >
            
                <Row >
                    
                        
                    <Col xs="auto">
                        
                        <Form.Control
                        
                            type="text"
                            placeholder="location"
                            className=" mr-sm-2"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Col>
                    
                    <Col xs="auto">
                        <Form.Control
                            type="date"
                            placeholder="CheckIn"
                            className=" mr-sm-2"
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={getCurrentDate()}
                        />
                        
                    </Col>

                    <Col xs="auto">
                        <Form.Control
                            type="date"
                            placeholder="CheckOut"
                            className=" mr-sm-2"
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={getCurrentDate()}
                        />
                    </Col>
                   
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col xs="auto">
                <button className="btn btn-primary"  onClick={() => navigate('/hotels/hotel?location=' +location)}>search</button>
                </Col>
                
                </Row>
                
                
                
               




            </div>
           
        </div>
    )
}

export default Search;