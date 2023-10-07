import React, { useState,useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PanierContext } from "../../context/PanierContext";
function Panier() {
 

  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(Cart);

  console.log(panier);

  // Fonction pour calculer le prix total
  const calculerTotal = () => {
    return panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);
  };

  function DeleteProduit( id ){
console.log(id);

  }

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((article) => (
            <tr key={article.produit._id}>
              <td>
                    <img className='d-block' width={0} height={50}  src={article.produit.Image[0]} />
                  {article.produit.Nom}
              </td>
              <td>{article.quantite}</td>
              <td>${article.produit.Prix}</td>
              <td>${article.quantite * article.produit.Prix}</td>
              <td><Button onClick={DeleteProduit(article.produit._id)} variant='ligth' className='btn btn-outline-danger'>X</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className='text-danger text-center ms-2'>Prix total : ${calculerTotal()}</p>
      <Button variant="primary">Payer</Button>
    </div>
  );
}

export default Panier;
