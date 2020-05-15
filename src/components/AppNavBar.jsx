import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import TitleHeader from './TitleHeader';

import logo from '../assets/logo.svg';
import Link from "react-router-dom/Link";
import ExperimentHeader from './ExperimentHeader';

const AppNavBar = ({ name, description }) => {
  return <header>
    <Navbar collapseOnSelect expand="sm" variant="dark">
      <Navbar.Brand>
        <Link to='/' className="router-link">
          <img
            src={logo}
            width="70"
            height="30"
            className="d-inline-block logo-icon align-middle"
          />
      labs
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav>
          <Nav.Link href="https://github.com/musicorum-app/labs">github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    {name ? <ExperimentHeader name={name} description={description} /> : <TitleHeader />}
  </header>
}

export default AppNavBar;
