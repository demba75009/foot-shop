import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState,useContext } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Style from "./theHeader.module.css"
import {  NavLink } from "react-router-dom";




     
 

function TheHeader( {userTrue,panierLength,handleSearch,clickResult}) {

  const [searchTerm, setSearchTerm] = useState('');
  

  const onSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const search = () => {
    clickResult(searchTerm)

  };
 
  
  return (
    <>
      {[ 'md',].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 sticky-top">
          <Container fluid>
            <Navbar.Brand href="#">Foot-Shop</Navbar.Brand>
            <NavLink to="/panier"> <FontAwesomeIcon icon=       {faShoppingCart} size="2x" />
              {panierLength.length > 0 && <span className={Style.cart}>{panierLength.length}</span>}
            </NavLink> 

         
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas className="bg-light"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Foot-Shop
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Acceuil</Nav.Link>
                  <Nav.Link href="/produit">Maillot</Nav.Link>
                  <Nav.Link href="/panier">Panier</Nav.Link>
                  
                  {userTrue.length > 0 ? (

                    <>
                      <Nav.Link href="/profil">Profil</Nav.Link>
                     <Nav.Link onClick={()=>{localStorage.removeItem('user')
                    localStorage.removeItem('panier')}} href="/">Deconnexion</Nav.Link>

                    </>

                  ) :
                  <>
                  <Nav.Link href="/signin">Connexion</Nav.Link>
                  <Nav.Link href="/signup">Inscription</Nav.Link>
                  </>
                }
                </Nav>
        
              </Offcanvas.Body>
            </Navbar.Offcanvas>
           
                


          </Container>
        </Navbar>
      ))}
         <Form className=" container d-flex  align-md-items-center">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className=" w-50"
                    aria-label="Recherchez"
                    value={searchTerm}
                    onChange={onSearchChange}
                  />
                  <Button className=' ms-2 w-25' variant="outline-secondary" onClick={search}>    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </Form>
    </>
  );
}
 
export default TheHeader;