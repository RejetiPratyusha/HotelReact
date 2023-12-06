// Layout.jsx
import React from "react";
import Search from "./search";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* Your header content goes here
        <h1>Hotel Booking App</h1> */}
      </header>

      <main>
        {children}
        {/* Render other components or pages within the main content */}
        <Search />
      </main>

      <footer>
        {/* Your footer content goes here
        <p>&copy; 2023 Hotel Booking App</p> */}
      </footer>
    </div>
  );
};

export default Layout;
