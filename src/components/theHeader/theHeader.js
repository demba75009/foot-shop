import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { PanierContext } from "../../context/PanierContext";
import { useState,useContext } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Style from "./theHeader.module.css"
import {  NavLink } from "react-router-dom";



function CartIcon({ itemCount }) {
  return (
    <div>
      <FontAwesomeIcon icon={faShoppingCart} size="2x" />
      {itemCount > 0 && <span className={Style.cart}>{itemCount}</span>}
    </div>
  );
}


function TheHeader() {
  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(Cart);

  return (
    <>
      {[ 'md',].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Foot-Shop</Navbar.Brand>
            <NavLink to="/panier"><CartIcon itemCount={Cart.length} />
            </NavLink> 
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
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
                  <Nav.Link href="/signin">Connexion</Nav.Link>
                  <Nav.Link href="/signup">Inscription</Nav.Link>

                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Recherchez"
                  />
                  <Button variant="outline-success">Recherchez</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>

          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default TheHeader;