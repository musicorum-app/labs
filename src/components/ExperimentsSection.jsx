import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import ExperimentModule from './ExperimentModule';

import mainstream from '../assets/experiments/mainstream.svg';

const AppNavBar = () => {
  return <section>
    <Container>
      <Row className="justify-content-md-start">
        <Col md="auto">
          <h5>EXPERIMENTS</h5>
        </Col>
      </Row>
      <Row>
        <Row xs={{ span: 10, offset: 1 }}>
          <ExperimentModule
            name="MAINSTREAM METTER"
            text="Check if you listen to more popular or underground artists/tracks."
            image={mainstream}
            page="mainstream"
          />
          <ExperimentModule
            name="MAINSTREAM METTER"
            text="Check if you listen to more popular or underground artists/tracks."
            image={mainstream}
            page="mainstream"
          />
          <ExperimentModule
            name="MAINSTREAM METTER"
            text="Check if you listen to more popular or underground artists/tracks."
            image={mainstream}
            page="mainstream"
          />
        </Row>
        {/* <Col md className="experiment-module"></Col> */}
      </Row>
    </Container>
  </section>
}

export default AppNavBar;
