import Accordion from 'react-bootstrap/Accordion';
import { ProductsContext } from "../../context/ProductContext";
import { useState, useEffect,useContext,useRef } from "react";
import ProductsItem from '../productItem/productItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useNavigate } from 'react-router-dom';

function ProductList() {
  const Prod  = useContext(ProductsContext)
  const history = useNavigate()

   const [Produits, setProduit] = useState(Prod)
   


   function Detail(id){


    history(`/Produit/${id}`)


  }




   return (
   <>
      <h1 className='text-center'> Foot-shop </h1>
    <div className='mt-5 d-flex flex-wrap justify-content-evenly'>
    

    {Produits.map(p=>(


        <ProductsItem
      
      ProductList = {p}
      ProductDetailAction={()=>Detail(p._id)}

      />


    ))}
          
          </div>
  </>

  );
}

export default ProductList;
