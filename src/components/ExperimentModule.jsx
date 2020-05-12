import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const ExperimentModule = ({ name, image, text}) => {
  return <Col md className="experiment-module">
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
  </Col>
}

export default ExperimentModule;