import React from 'react';
import { Card } from 'react-bootstrap';

function APropos  () {
  return (
    <div className='container mt-5'>
    <Card >
      <Card.Header as="h5">À Propos de foot-shop</Card.Header>
      <Card.Title className='mt-5'>Technologie utilisé</Card.Title>
      <Card.Body>
        <Card.Text>
        Cette application web "Foot-Shop" combine un frontend réactif avec un backend robuste et intègre la gestion des paiements via Stripe pour offrir une expérience de magasinage en ligne complète. 
        </Card.Text>

        <Card.Title className='mt-5'>Frontend avec ReactJS et React Bootstrap :</Card.Title>
        <Card.Text>
          Composants : Utilisation de composants React pour structurer l'interface utilisateur. Par exemple, composants de produit, panier, page de paiement, etc.
          <br></br>
          État global : Utilisation du contexte React ou Redux pour gérer l'état global, notamment le contenu du panier, les détails du produit, etc.
          <br></br>
          Styles : Utilisation de React Bootstrap pour des composants d'interface utilisateur pré-stylés.
        </Card.Text>
        <Card.Title className='mt-5'>Backend avec Node.js et Express :</Card.Title>
        <Card.Text>
        API : Utilisation d'Express pour créer une API RESTful qui gère les opérations liées aux produits, au panier, aux utilisateurs, etc.
        <br></br>
        Base de données : Utilisation de MongoDB comme base de données pour stocker les informations sur les produits, les utilisateurs, les commandes, etc.
        <br></br>
        Routes : Définition de routes Express pour gérer les demandes du frontend, telles que l'obtention de la liste des produits, la gestion du panier, la création de commandes, etc.
        </Card.Text>
        <Card.Title className='mt-5'>Gestion des paiements avec Stripe :</Card.Title>


        <Card.Text>Intégration Stripe : Utilisation de l'API Stripe pour gérer les paiements. Cela implique la création de produits et de tarifs dans le tableau de bord Stripe, ainsi que la gestion de la session de paiement côté serveur.
          <br></br>
        Flux de paiement : Lorsque l'utilisateur procède au paiement, l'application crée une session de paiement avec Stripe. L'utilisateur est redirigé vers une page de paiement où il saisit ses informations de carte de crédit.
        <br></br>
        Webhooks : Mise en place de webhooks pour traiter les événements liés aux paiements côté serveur.</Card.Text>


      </Card.Body>
    </Card>
    </div>
  );
};

export default APropos;
