import NavbarComponent from "../navbar/navbar";
import SearchHotels from "../search/SearchHotels";
import React, { Component } from "react";
class Home extends Component {
  render() {
    const divStyle = {
      backgroundImage: "url(/Home.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100vw",
      height: "100vh",
      backgroundSize: "cover",
    };

    const containerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    };

    return (
      <div className="mb-4" style={divStyle}>
        <NavbarComponent />
        <div className="container" style={containerStyle}>
          <div>
            {/* <Header /> */}
            <SearchHotels />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
