import React, { useState,useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { PanierContext } from "../../context/PanierContext";
import DeleteArticleModal from '../utils/modal'; // Assurez-vous d'importer le composant
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Panier({updatePanier,Panier}) {
 


  const [panier, setPanier] = useState(Panier);
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
      updatePanier(tableauLocalStorage)
      toast.success(`${produit.produit.Nom} a été retiré au panier !`);
      
      closeDeleteModal();
    
      
  }

  return (
    <div>

{

  panier.length > 0 ? (

    <>
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
    
      <h2 className='text-center mt-5'>Votre Panier:</h2>
      <Table className='container w-50' striped bordered>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Taille</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((article) => (
            <tr key={article.produit._id}>
              <td>
                <img className='d-block' width={50} height={50}  src={article.produit.Image[0]} />
                  {article.produit.Nom}
              </td>
              <td>
              
              <select value={article.taille} onChange={(e)=>ChangeSize(article,e.target.value)} className=" ms-2 h-25" id="taille">
                          <option value="xs"> XS</option>
                          <option value="s"> S</option>
                          <option value="m"> M</option>
                          <option value="l"> L</option>
                          <option value="xl"> XL</option>
                      </select>

              
              </td>


              <td>
                    <select value={article.quantite} onChange={(e) => ChangeQuantité(article,e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
            </td>
              <td>{article.quantite * article.produit.Prix}€</td>
              <td><Button variant="light" onClick={()=>openDeleteModal(article.produit._id,article.taille)}className='btn btn-outline-danger'>X</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3 className='text-danger text-center ms-2'>Prix total : {calculerTotal()}€</h3>
     
     <div className='mt-5 text-center'>
         <Button className='mx-auto' onClick={()=>{history("/checkout")}} variant="success">Valider le panier</Button>
      </div>

      
      <ToastContainer />
      </>
    ) :<h1 className='text-center mt-5'> Votre Panier est vide ! </h1>}
    </div>
  );
}

export default Panier;
