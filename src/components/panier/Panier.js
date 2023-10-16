import React, { useState,useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PanierContext } from "../../context/PanierContext";
import DeleteArticleModal from '../utils/modal'; // Assurez-vous d'importer le composant

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Panier() {
 

  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(Cart);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);


  function openDeleteModal (id)  {
    setArticleIdToDelete(id);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // Fonction pour calculer le prix total
  const calculerTotal = () => {
    return panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);
  };

  function ChangeQuantité(article,quantité) {
    
  
    
    article.quantite = parseInt(quantité, 10)
    
    const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

    var indexASupprimer = -1;


    for (var i = 0; i < tableauLocalStorage.length; i++) {
     if (tableauLocalStorage[i].produit._id === article.produit._id ) {
       indexASupprimer = i;
       break; // Quittez la boucle une fois que l'objet est trouvé
     }
   }

   if (indexASupprimer !== -1) {
    tableauLocalStorage.splice(indexASupprimer, 1,article);
  }

  localStorage.setItem('panier', JSON.stringify(tableauLocalStorage));

      setPanier(tableauLocalStorage);


  }

  function DeleteProduit(articleIdToDelete ){

    const produit = panier.find(p=>p.produit._id===articleIdToDelete)
    
    const nouvelArticle = { produit };

    
      const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)

     if(tooglePanier)
       nouvelArticle.produit.InPanier = false

       const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

       var indexASupprimer = -1;


       for (var i = 0; i < tableauLocalStorage.length; i++) {
        if (tableauLocalStorage[i].produit._id === articleIdToDelete ) {
          indexASupprimer = i;
          break; // Quittez la boucle une fois que l'objet est trouvé
        }
      }

      if (indexASupprimer !== -1) {
        tableauLocalStorage.splice(indexASupprimer, 1);
      }

      localStorage.setItem('panier', JSON.stringify(tableauLocalStorage));

      setPanier(tableauLocalStorage);
      toast.success(`${produit.produit.Nom} a été retiré au panier !`);
      
      closeDeleteModal();
    
      
  }

  return (
    <div>

      <div>
         {/* Modal de suppression réutilisable */}
      <DeleteArticleModal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        onDelete={DeleteProduit}
        id={articleIdToDelete}
      />
    </div>
      <h2>Panier</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Taille</th>
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
              <td>{article.produit.taille}</td>


              <td>
                    <select value={article.quantite} onChange={(e) => ChangeQuantité(article,e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
            </td>
              <td>${article.produit.Prix}</td>
              <td>${article.quantite * article.produit.Prix}</td>
              <td><Button variant="light" onClick={()=>openDeleteModal(article.produit._id)}className='btn btn-outline-danger'>X</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className='text-danger text-center ms-2'>Prix total : ${calculerTotal()}</p>
      <Button variant="primary">Payer</Button>
      <ToastContainer />

    </div>
  );
}

export default Panier;
