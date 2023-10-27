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
            
        <Card className='text-center sticky-top' >
          
          <img style={{display:"block",margin:"auto"}} className='w-50  mr-auto' src={Avatar} alt="" srcset="" />
         
          <h2>{user[0].Nom} {user[0].Prenom} </h2>         
          <h3> Date de naissance: {user[0].DateBirth} </h3>
          <h4> Ville: {user[0].Ville} </h4>
          <h4> Portable: {user[0].Mobile} </h4>

          </Card>
        </Col>
        <Col md={8}>
        <h2> Mes Commandes : </h2>
            {
                user[0].Commande.map(p=>(
                  <>
                            <Card className='mt-5'>

                    <h4 className='text-center'>Commande n° {p.idCommande} </h4> <h5 className='text-center'>Etat: En cour</h5>
                  {p.CommandeList.map(p2 => (
                    <>

                    


                    
                    {
                        Array.isArray(p2) ?
                        (
                            
                          
                            p2.map(p1=>(

                                <>
                                 <div className=''>
                                   
                      
                                    
                                  
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
                        </Table>
          
                  </div>
                            
                            </>

                            ))
                  ) : 
                  <div className=''>
                                  
                                  
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
                  
                  <tbody>
                  <tr key={p2.produit._id}>
                    <td>
                        <div className='d-flex justify-content-center'>
                        <img className='w-25 d-block' src={p2.produit.Image[0]} />
                        </div>
                        <p className='text-center'>{p2.produit.Nom}</p> 
                    </td>
                    <td>{p2.taille}</td>
                    <td>{p2.quantite}€</td>
                    <td>{p2.produit.Prix}€</td>
                    <td>{p2.quantite * p2.produit.Prix}€</td>

                    
                  </tr>
              
              </tbody>
              </Table>

        </div>


                    }
                  
           </>
                        ))
      }     
                              </Card>

       </>

                  
                        ))


            }
        </Col>
      </Row>
    </Container>
  );
}

export default Profil;
