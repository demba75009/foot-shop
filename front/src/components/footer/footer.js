import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer  ()  {
  return (
    <footer className=" bg-secondary  mt-5 text-dark">
      <Container >
        <Row className='mt-5'>
          <Col md={4}>
            <h4>Football-Shop</h4>
            <p>Le site de maillot en ligne !</p>
          </Col>
          <Col md={4}>
            <h4>Quelques informations:</h4>
            <ul>
              <li>Acceuil</li>
              <li>Shop</li>
              <li>A propos de nous</li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Contact Information</h4>
            <address>
              123 Football Design Street<br />
              Soccer City, Footville<br />
              Email: info@footdesignshop.com<br />
              Phone: +1 (123) 456-7890
            </address>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
