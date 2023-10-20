import React, { useState,useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PanierContext } from "../../context/PanierContext";
import DeleteArticleModal from '../utils/modal'; // Assurez-vous d'importer le composant
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Panier() {
 

  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(Cart);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);
  const [articleSizeToDelete, setArticleSizeToDelete] = useState("");

  const history = useNavigate(); // Utilisé pour naviguer vers une autre route


  function openDeleteModal (id,t)  {
    setArticleIdToDelete(id);
    setArticleSizeToDelete(`${t}`)
 
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // Fonction pour calculer le prix total
  const calculerTotal = () => {
    return panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);
  };


  function ChangeSize(article,articlesize){

    console.log(article.taille);

    const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

    var indexASupprimer = -1;

    for (var i = 0; i < tableauLocalStorage.length; i++) {
     if (tableauLocalStorage[i].taille === article.taille && tableauLocalStorage[i].produit._id === article.produit._id )  {

      
        console.log("ok");
        indexASupprimer = i;
        break; // Quittez la boucle une fois que l'objet est trouvé

      
     }
   }

   article.taille = articlesize

   if (indexASupprimer !== -1) {
    tableauLocalStorage.splice(indexASupprimer, 1,article);
  }

  localStorage.setItem('panier', JSON.stringify(tableauLocalStorage));

      setPanier(tableauLocalStorage);


   }


  function ChangeQuantité(article,quantité) {
      
    
    article.quantite = parseInt(quantité, 10)
    
    const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

    var indexASupprimer = -1;


    console.log(tableauLocalStorage);

    console.log(article);

    for (var i = 0; i < tableauLocalStorage.length; i++) {
     if (tableauLocalStorage[i].produit._id === article.produit._id && tableauLocalStorage[i].taille === article.taille  ) {
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

  function DeleteProduit(articleIdToDelete,articleSizeToDelete){

    console.log(articleSizeToDelete);

  

    const produit = panier.find(p=>p.taille === articleSizeToDelete && p.produit._id === articleIdToDelete)


    

    

       const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

       var indexASupprimer = -1;


       for (var i = 0; i < tableauLocalStorage.length; i++) {
        if (tableauLocalStorage[i].produit._id === articleIdToDelete && tableauLocalStorage[i].taille === articleSizeToDelete ) {
         
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
        t={articleSizeToDelete}
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
              <td>
              
              <select value={article.taille} onChange={(e)=>ChangeSize(article,e.target.value)} className="mt-4 ms-2 h-25" id="taille">
                          <option value="xs">Taille XS</option>
                          <option value="s">Taille S</option>
                          <option value="m">Taille M</option>
                          <option value="l">Taille L</option>
                          <option value="xl">Taille XL</option>
                      </select>

              
              </td>


              <td>
                    <select value={article.quantite} onChange={(e) => ChangeQuantité(article,e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
            </td>
              <td>${article.produit.Prix}</td>
              <td>${article.quantite * article.produit.Prix}</td>
              <td><Button variant="light" onClick={()=>openDeleteModal(article.produit._id,article.taille)}className='btn btn-outline-danger'>X</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className='text-danger text-center ms-2'>Prix total : ${calculerTotal()}</p>
      <Button onClick={()=>{history("/checkout")}} variant="primary">Valider le panier</Button>
      <ToastContainer />

    </div>
  );
}

export default Panier;
