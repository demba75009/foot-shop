import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Banner.css'; // Pour les styles
import { useNavigate } from 'react-router-dom';

 function Banniere(){

  const history = useNavigate(); // Utilisé pour naviguer vers une autre route


    return (
 
    <div className="banner mt-5">
    <Container>
      <Row>
        <Col md={6}>
          <h1>Des produits adapté a tous </h1>
          <p>Découvrez nos produit</p>
          <Button onClick={()=> history("/produit")} variant="primary">Acheter maintenant</Button>
        </Col>
        <Col md={6}>
          {/* Ajoutez ici une image ou un élément visuel */}
        </Col>
      </Row>
    </Container>
  </div>
    )
} 

export default Banniere