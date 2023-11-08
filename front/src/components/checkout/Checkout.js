import React, { useState,useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PanierContext } from "../../context/PanierContext";
import { userContext } from "../../context/UserContext";
import { Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import { useNavigate } from 'react-router-dom';



const stripePromise = loadStripe('pk_test_51NLncNCV4GRE9vPYUQSxxjMIeRk1riEMQCb34lvQOByEuF1UFPYSeC0VCHl4UPoGN7Y6xJmij0puoD8fwMX0AeGF00Bs5vjhBp');

function CheckoutForm({panier,user}) {
    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate(); // Utilisé pour naviguer vers une autre route


    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [paiementRefuse, setPaiementRefuse] = useState(false);
    const [ErrorCarteinvalide, setErrorCarteInvalide] = useState("");
    const [clientName, setClientName] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [adresse, setAdresse] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [ville, setVille] = useState("");




  
  
      const t = panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);

    
  
    const Validation = async (event) => {

      const client = {
        nom,
        prenom,
        email,
        adresse,
        codePostal,
        ville

      }

     

      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      // Gérez la soumission du paiement ici en utilisant Stripe API
      // Utilisez stripe.createToken ou stripe.createPaymentMethod pour obtenir le token ou le paiement
  
      const cardElement = elements.getElement(CardElement);

      const { token, error } = await stripe.createToken(cardElement,{

        nameCard: `${client.nom} ${client.prenom}`,
      });


      // Ensuite, envoyez le token ou le paiement à votre serveur pour le traitement
      
        if (error) {
          console.error(error);
          setErrorCarteInvalide(error.message)
        } 
        else {
          // Envoyez le token au serveur pour traiter le paiement.
          const response = await fetch('http://localhost:5000/products/paiement', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.id, montant: t,client: client,Commande:panier,user:user }),
          });
       
          if (response.ok) {
            // Le paiement a réussi, affichez un message de confirmation à l'utilisateur.
            const donnée = await response.json()
            console.log(donnée);
            setIsPaymentComplete(true);
            setPaiementRefuse(false);
            const UserLocalStorage = JSON.parse(localStorage.getItem('user'));

            UserLocalStorage.Commande.push({CommandeList:panier,idCommande:donnée.idCommande})
            localStorage.setItem('user', JSON.stringify(UserLocalStorage));
            localStorage.removeItem('panier')



          } else {
            // Le paiement a échoué, affichez un message d'erreur à l'utilisateur.
            setPaiementRefuse(true);

          }
        }
      
    };
  
    return (
      <>
      {isPaymentComplete ? (
        <div className='text-center mt-5' >
          <h2>Paiement réussi !</h2>
          <p>Merci pour votre achat.</p>
          <p>Nous vous enverront un mail de confirmation de votre commande a {email}</p>
          <Button variant='info' onClick={()=> history("/produit")}>Achetez d'autre produit</Button>
          <Commande panierOK={panier} />
          
       

        </div>
      ) : (
        <div>

        { paiementRefuse ? (
        <Alert variant="danger">
        Le paiement a été refusé. Veuillez vérifier vos informations de paiement.
      </Alert>
        ) :""
        }
        <>

        <Commande panierOK={panier} />

{ user.length > 0 ? (

      <Form className='mt-5'>

      <h2>Information de Livraison</h2>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre nom" value={nom} onChange={e => setNom(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Prenom</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre prénom" value={prenom} onChange={e => setPrenom(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Entrez votre prénom" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Adresse" value={adresse} onChange={e => setAdresse(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Code postal</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Code postal" value={codePostal} onChange={e => setCodePostal(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Ville"  value={ville} onChange={e => setVille(e.target.value)}/>
          </Form.Group>

        <h2 className='mt-5 text-center'>Paiement:</h2>

        <Form.Group controlId="for">

        <Form.Label>Nom sur la carte</Form.Label>

        <Form.Control type="text" placeholder="Nom sur la carte"  value={clientName} onChange={e => setClientName(e.target.value)} />
        </Form.Group>

        <Form.Group className='mt-2' controlId="formCard">      

          <Form.Label>Numéro de carte</Form.Label>
          {ErrorCarteinvalide.length >0 &&
            <Alert variant="danger">
            Carte bancaire invalide
            </Alert>

          }
          <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                  },
                },
              }}
            />        
          </Form.Group>

        <div className='text-center'>
          {isPaymentComplete ?(
         
         <Button variant="success">V</Button>
          ) : 
          <Button className='mt-4 mx-auto' onClick={Validation}>Payer {t} €</Button>
          }
        </div>
      </Form>
) : (

  <>
    <h2 className='text-center mt-5'> Avez vous un compte ? <br></br> Pour continuez , veuillez vous inscrire ou vous connectez </h2>

  <div className='d-flex justify-content-evenly mt-5'>

    <Button variant='primary' onClick={()=> history("/signup")}> S'inscrire </Button>
    <Button variant="info" onClick={()=> history("/signin")}> Se connecter </Button>

  </div>
  </>
)

}
      </>
      </div>
      )}
      </>

    );
  }

  function Commande({panierOK}){
    
  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(panierOK);


  const calculerTotal = () => {
    return panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);
  };


    return(

        <>
        <h2 className='text-center mt-5'>Votre Commande</h2>
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
            {panier.map((article) => (
              <tr key={article.produit._id}>
                <td>
                  <img className='d-block' width={50} height={50}  src={article.produit.Image[0]} />
                    {article.produit.Nom}
                </td>
                <td>{article.taille}</td>
                <td>{article.quantite}</td>
                <td>{article.produit.Prix}€</td>
                <td>{article.quantite * article.produit.Prix}€</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
        <h3 className='text-danger text-center ms-2'>Prix total : {calculerTotal()}€</h3>

        </>

    )
  }
  

export default function Checkout({Panier,updateUser}){


    

    return (
        <Container>


        <Form>
        
          {/* Ajoutez d'autres champs de livraison ici */}
          <Elements stripe={stripePromise}>
            <CheckoutForm panier={Panier} user={updateUser} />
          </Elements>
        </Form>
      </Container>
);


}