import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Link from 'react-router-dom/Link';

const ExperimentModule = ({ name, image, text, page }) => {
  return <Col xs={{ span: 10, offset: 1 }} md={{ span: 4, offset: 0 }} className="experiment-module">
    <Link to={`/${page}`} className="router-link">
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
    </Link>
  </Col>
}

export default ExperimentModule;