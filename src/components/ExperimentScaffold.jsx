import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AppNavBar from './AppNavBar';

const TitleHeader = ({name, description, children}) => {
  return <div>
    <AppNavBar name={name} description={description}/>
    <div className="scaffold">
      <Container>
        <Row>
          <Col xs={{span: 10, offset: 1}} md={{span: 12, offset: 0}}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  </div>
}

export default TitleHeader;
