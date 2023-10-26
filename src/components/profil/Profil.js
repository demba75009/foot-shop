import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Profil() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          {/* Informations du profil */}
          <Card>
            {/* Contenu du profil ici */}
          </Card>
        </Col>
        <Col md={8}>
          {/* D'autres rubriques du profil */}
          <Card>
            {/* Contenu des rubriques du profil ici */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profil;
