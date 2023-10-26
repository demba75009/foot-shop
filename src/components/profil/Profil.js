import React, { useState,useContext } from 'react';

import { Container, Row, Col, Card,Table } from 'react-bootstrap';
import { userContext } from "../../context/UserContext";
import Avatar from "../../assets/avatar.png"


function Profil() {
    const User  = useContext(userContext)
    const [user, setUser] = useState(User);

  
    const calculerTotal = () => {
        
        const d = user[0].Commande.map(p=>p)

        console.log(d);
      };
    

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={4}>
            <img src={Avatar} alt="" srcset="" />
        <Card>
        <h2>Nom: </h2>         
          <h2> {user[0].Username} </h2>

          </Card>
        </Col>
        <Col md={8}>
        <h2> Mes Commandes : </h2>
          <Card>
            {
                user[0].Commande.map(p=>(
                 <div className=''>
                    <hr ></hr>
                    <h3 >Commande n° </h3>
       
                    
                  
                    <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Taille</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    
                    {
                        Array.isArray(p) ?
                        (
                            
                          
                            p.map(p1=>(

                                <>
                                <tbody>
                                <tr key={p1.produit._id}>
                                  <td>
                                    <div className='d-flex justify-content-center'>
                                        <img className='w-25 d-block' src={p1.produit.Image[0]} />
                                    </div>
                                     <p className='text-center'>{p1.produit.Nom}</p> 
                                  </td>
                                  
                                  <td>{p1.taille}</td>
                                  <td>{p1.quantite}</td>
                                  <td>
                                    
                                      {p1.produit.Prix}€
                                  </td>
                          <td>{p1.quantite * p1.produit.Prix}€</td>
                                  
                                </tr>
                            
                            </tbody>
                            
                            </>

                            ))
                  ) : <tbody>
                  <tr key={p.produit._id}>
                    <td>
                        <div className='d-flex justify-content-center'>
                        <img className='w-25 d-block' src={p.produit.Image[0]} />
                        </div>
                        <p className='text-center'>{p.produit.Nom}</p> 
                    </td>
                    <td>{p.taille}</td>
                    <td>{p.quantite}€</td>
                    <td>{p.produit.Prix}€</td>
                    <td>{p.quantite * p.produit.Prix}€</td>

                    
                  </tr>
              
              </tbody>


                    }
                    <h3 className='text-danger text-center ms-2'>Prix total : ${calculerTotal()}</h3>
                  </Table>
          
                  </div>
                ))
            }
           
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profil;
