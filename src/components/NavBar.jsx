import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import logo from "../images/Sneaks_Logo.png";

const NavBar = () => {
  return (
    <Navbar bg="light" className="navbar">
      <Navbar.Brand>
        <a href="/">
          <img
            src={logo}
            style={{ width: 130, marginTop: 5, marginLeft: 10 }}
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="ml-auto"
          style={{ marginRight: 10, marginTop: 8, marginBottom: 8 }}
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="http://github.com/druv5319/Sneaks-API">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
