import { useState,useContext } from "react";
import MaquetteAcceuil from "../utils/MaquetteAcceuil";
import Banniere from "../utils/banniere"
import Temoignages from "../utils/Temoignages";
import TendanceItem from '../productItem/TendanceItem';
import { ProductsContext } from "../../context/ProductContext";
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Acceuil() {


    const Prod  = useContext(ProductsContext)

    const history = useNavigate()

    const [Produits, setProduit] = useState(Prod)

    const Tendance = Produits.slice(3,9)


    function Detail(id){

        history(`/Product/${id}`)
    
      }


return(
    <>
    <MaquetteAcceuil />

    <h1 className='text-center mt-5'> Nos produits tendance : </h1>

    <Container className="bg-light">
      <Row>
        <Col className="d-flex overflow-md-hidden overflow-sm-visible" xs={12} sm={12} md={12} lg={12} style={{ overflowX: 'auto' }}>

            {Tendance.map(p=>(


            <div>

                <TendanceItem
              
              ProductList = {p}
              ProductDetailAction={()=>Detail(p._id)}



              />

            </div>

            ))}
        </Col>
        {/* Add more columns as needed */}
      </Row>
    </Container>


    <Banniere />


    <Temoignages />


    </>

)



    }