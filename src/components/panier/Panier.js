import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

function Panier() {
  const [panier, setPanier] = useState([
    { id: 1, nom: 'Produit 1', quantite: 2, prix: 10 },
    { id: 2, nom: 'Produit 2', quantite: 1, prix: 20 },
  ]);

  // Fonction pour calculer le prix total
  const calculerTotal = () => {
    return panier.reduce((total, article) => total + article.quantite * article.prix, 0);
  };

  return (
    <div>
      <h2>Panier</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((article) => (
            <tr key={article.id}>
              <td>{article.nom}</td>
              <td>{article.quantite}</td>
              <td>${article.prix}</td>
              <td>${article.quantite * article.prix}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Prix total : ${calculerTotal()}</p>
      <Button variant="primary">Payer</Button>
    </div>
  );
}

export default Panier;
