import { ProductsContext } from "../../context/ProductContext";
import { PanierContext } from "../../context/PanierContext";
import { useState,useContext } from "react";
import ProductsItem from '../productItem/productItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

function ProductList() {
  const Prod  = useContext(ProductsContext)
  const Cart  = useContext(PanierContext)
  const history = useNavigate()

   const [Produits, setProduit] = useState(Prod)
   
   
   // État pour stocker le panier
   const [panier, setPanier] = useState(Cart);

   

   const Tendance = Produits.slice(4,8)


    panier.forEach(o1 => {



      const o2 = Produits.find(o2 =>o2._id === o1.produit._id)



      if (o2 && o1.InPanier !== o2.InPanier) {
      
        // Si un objet correspondant est trouvé et que la valeur de la clé est différente, mettez à jour la valeur
        o2.InPanier = true;
      }

    })

   

  
    // Fonction pour ajouter un produit au panier
    const AddPanier = (id, quantite) => {
         const produit = Produits.find(p=>p._id===id)

          const taille= "s"          
         
         const nouvelArticle = { produit, quantite,taille };

         
       
         const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)
 
        if(tooglePanier)
          nouvelArticle.produit.InPanier = true

          const nouveauPanier = [...panier];

          nouveauPanier.push(nouvelArticle)

          
            setPanier(nouveauPanier);  
  
                // Sérialisez le panier en JSON
          const panierJSON = JSON.stringify(nouveauPanier);
  
  
          // Stockez la chaîne JSON dans le localStorage avec une clé (par exemple, "panier")
          localStorage.setItem('panier', panierJSON);
  
        
          toast.success(`${produit.Nom} a été ajouté au panier !`);

       
    };
    
    function DeletePanier (id,quantite)  {

      const produit = Produits.find(p=>p._id===id)
          
      const nouvelArticle = { produit, quantite };

    
      const tooglePanier =  panier.some(p =>p[produit.Nom] === nouvelArticle.Nom)

     if(tooglePanier)
       nouvelArticle.produit.InPanier = false

       const tableauLocalStorage = JSON.parse(localStorage.getItem('panier'));

       var indexASupprimer = -1;


       for (var i = 0; i < tableauLocalStorage.length; i++) {
        if (tableauLocalStorage[i].produit._id === id ) {
          indexASupprimer = i;
          break; // Quittez la boucle une fois que l'objet est trouvé
        }
      }

      if (indexASupprimer !== -1) {
        tableauLocalStorage.splice(indexASupprimer, 1);
      }
      

 

      localStorage.setItem('panier', JSON.stringify(tableauLocalStorage));

      setPanier(tableauLocalStorage);



  
    toast.success(`${produit.Nom} a été retiré au panier !`);

    }


   function Detail(id){

    history(`/Product/${id}`)

  }



   return (
   <>

    <h1 className='text-center mt-5'> Nos produits tendance : </h1>

    <Container className="bg-secondary">
      <Row>
        <Col className="d-flex overflow-md-hidden overflow-sm-visible" xs={12} sm={12} md={12} lg={12} style={{ overflowX: 'auto' }}>

    {Tendance.map(p=>(


<div>

        <ProductsItem
      
      ProductList = {p}
      ProductDetailAction={()=>Detail(p._id)}
      ProductAddPanier={()=>AddPanier(p._id,1)}
      ProductDeletePanier={()=>DeletePanier(p._id,1)}



      />

</div>

    ))}
    </Col>
        {/* Add more columns as needed */}
      </Row>
    </Container>
      <ToastContainer />



          <h1 className='text-center'> Liste des produits </h1>


    <div className='mt-5 d-flex flex-wrap justify-content-evenly'>
    
    {Produits.map(p=>(


        <ProductsItem
      
      ProductList = {p}
      ProductDetailAction={()=>Detail(p._id)}
      ProductAddPanier={()=>AddPanier(p._id,1)}
      ProductDeletePanier={()=>DeletePanier(p._id,1)}



      />


    ))}
      <ToastContainer />

          </div>
  </>

  );
}

export default ProductList;
