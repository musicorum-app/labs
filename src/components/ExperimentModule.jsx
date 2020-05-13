import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Link from 'react-router-dom/Link';

const ExperimentModule = ({ name, image, text, page }) => {
  return <Link to={`/${page}`} className="router-link">
    <Col md className="experiment-module">
      <Container>
        <Row>
          <img className="experiment-module-img" src={image} />
        </Row>
        <Row>
          <h5 className="experiment-module-name">{name}</h5>
        </Row>
        <Row>
          {text}
        </Row>
      </Container>
    </Col></Link>
}

export default ExperimentModule;