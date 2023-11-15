
import { ProductsContext } from "../../context/ProductContext";
import { useState, useEffect,useContext } from "react";
import { useParams } from 'react-router-dom';
import ProductsItemDetail from "./ProductItemDetail";

import { PanierContext } from "../../context/PanierContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Banniere from "../utils/banniere";


export default function ProduitDetail ({updatePanier}) {



   const Produits  = useContext(ProductsContext)

   const Cart  = useContext(PanierContext)



   const url = useParams()


   const idParams = url.id


   // État pour stocker le panier
   const [panier, setPanier] = useState(Cart);
   const [taille, setTaille] = useState("xs");
   const [quantite, setQuantite] = useState(1);
   

    panier.forEach(o1 => {



      const o2 = Produits.find(o2 =>o2._id === o1.produit._id)



      if (o2 && o1.InPanier !== o2.InPanier) {
      
        // Si un objet correspondant est trouvé et que la valeur de la clé est différente, mettez à jour la valeur
        o2.InPanier = true;
      }

    })

   function ChangeTaille(size){

    const nouvelletaille = size

    setTaille(nouvelletaille)
   }

   function ChangeNombre(quantité) {

    const quantite1 = parseInt(quantité, 10)

    setQuantite(quantite1)


   }

    // Fonction pour ajouter un produit au panier
    const AddPanier = (id) => {
      const produit = Produits.find(p=>p._id===id)
       
      

      const nouvelArticle = { produit, quantite,taille };

      
    
      const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)

      const tooglePanier1 =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom && p.taille === nouvelArticle.taille )


     if(tooglePanier)
       nouvelArticle.produit.InPanier = true

       if(tooglePanier1)
       {
        const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

        var indexASupprimer = -1;
    
        for (var i = 0; i < tableauLocalStorage.length; i++) {
         if (tableauLocalStorage[i].taille === nouvelArticle.taille && tableauLocalStorage[i].produit._id === nouvelArticle.produit._id )  {
    
          
            console.log("ok");
            indexASupprimer = i;
            break; // Quittez la boucle une fois que l'objet est trouvé
    
          
         }
       }
    
    
       if (indexASupprimer !== -1) {
        tableauLocalStorage.splice(indexASupprimer, 1,nouvelArticle);
      }
    
      localStorage.setItem('panier', JSON.stringify(tableauLocalStorage));
    
          setPanier(tableauLocalStorage);


       }
 

       if(!tooglePanier1){


       
       const nouveauPanier = [...panier];

       nouveauPanier.push(nouvelArticle)

      
         setPanier(nouveauPanier);  
         updatePanier(nouveauPanier)


             // Sérialisez le panier en JSON
       const panierJSON = JSON.stringify(nouveauPanier);


       // Stockez la chaîne JSON dans le localStorage avec une clé (par exemple, "panier")
       localStorage.setItem('panier', panierJSON);
       
       
      }

      toast.success(`${produit.Nom} a été ajouté au panier !`);
    
 };
 
 

   return(

       <>

   

       <div className="my-20 lg:flex detail ">

     {Produits.filter(pt=>pt._id ===idParams).map(p=>(

               <ProductsItemDetail 
               key={p._id}
               ProductList={p}
               ProductAddPanier={()=>AddPanier(p._id,1)}
               Taille={taille}
               ChangeSize={ChangeTaille}
               ChangeQuantité={ChangeNombre}

 
               />

              
     ))}

        <ToastContainer />

       
       
       </div>
       
        <Banniere />

    
       </>


   )




}