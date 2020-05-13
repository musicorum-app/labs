import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import logoText from '../assets/logotext.svg';

const TitleHeader = () => {
  return <div className="title">
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
}

export default TitleHeader;
