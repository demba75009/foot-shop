import Accordion from 'react-bootstrap/Accordion';
import { ProductsContext } from "../../context/ProductContext";
import { useState, useEffect,useContext,useRef } from "react";
import ProductsItem from '../productItem/productItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ProductList() {
  const Prod  = useContext(ProductsContext)

   const [Produits, setProduit] = useState(Prod)
   
  return (

    <div className='mt-5 d-flex justify-content-evenly'>
    

    {Produits.map(p=>(


        <ProductsItem
      
      ProductList = {p}
      />


    ))}
          
          </div>

  );
}

export default ProductList;
