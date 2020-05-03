import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
    return (
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Marvel Vs DC
    </Navbar.Brand>
    <Nav className="mr-auto justify-content-end" style={{ width: "100%" }} >
         <LinkContainer exact to="/">
         <Nav.Link>Home</Nav.Link>
         </LinkContainer>
         <LinkContainer to="/about">
         <Nav.Link >About</Nav.Link>
         </LinkContainer>
         <LinkContainer to="/contact">
         <Nav.Link>Contact</Nav.Link>
         </LinkContainer>
      
    </Nav>
  </Navbar>
    )
}
