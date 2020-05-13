import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AppNavBar from './AppNavBar';

const TitleHeader = ({ name, children }) => {
  return <div>
    <AppNavBar name={name} />
    <div className="scaffold">
      <Container>
        <Row>
          <Row>
            {children}
          </Row>
        </Row>
      </Container>
    </div>
  </div>
}

export default TitleHeader;
