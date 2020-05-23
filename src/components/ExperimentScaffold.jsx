import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import AppNavBar from './AppNavBar';

const TitleHeader = ({name, description, children}) => {
  return <div>
    <AppNavBar name={name} description={description}/>
    <div className="scaffold">
      <Col xs={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }} xl={{ span: 6, offset: 3 }}>
        {children}
      </Col>
    </div>
  </div>
}

export default TitleHeader;
