import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './BackgroundDiv.css'; // Pour les styles
import { useNavigate } from 'react-router-dom';


export default function MaquetteAcceuil(){

  const history = useNavigate(); // Utilisé pour naviguer vers une autre route



    return (
        <div className="background-div mt-5">
        <Container>
          <h1>Trouvez votre style gagnant chez Foot-Shop : <br></br> Maillots de football de qualité pour tous les passionnés du jeu!</h1>
          <p>Découvrir nos produits</p>
          <Button onClick={()=> history("/produit")} variant="primary">Acheter maintenant</Button>

        </Container>
      </div>
    )
 
}