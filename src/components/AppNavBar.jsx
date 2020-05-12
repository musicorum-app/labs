import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import logo from '../assets/logo.svg';
import logoText from '../assets/logotext.svg';

const AppNavBar = () => {
  return <header>
    <Navbar collapseOnSelect expand="sm" variant="dark">
      <Navbar.Brand>
        <img
          src={logo}
          width="70"
          height="30"
          className="d-inline-block logo-icon align-middle"
        />
      labs
    </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav>
          <Nav.Link>github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="title">
      <img src={logoText} />
      <p className="title-text">lab<span className="red-cursor">s</span></p>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <p className="header-text">A group of tools and experiments using last.fm data (and maybe spotify).</p>
          </Col>
        </Row>
      </Container>
    </div>
  </header>
}

export default AppNavBar;
