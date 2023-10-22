import React, { useState,useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PanierContext } from "../../context/PanierContext";
import { userContext } from "../../context/UserContext";
import { Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';



const stripePromise = loadStripe('pk_test_51NLncNCV4GRE9vPYUQSxxjMIeRk1riEMQCb34lvQOByEuF1UFPYSeC0VCHl4UPoGN7Y6xJmij0puoD8fwMX0AeGF00Bs5vjhBp');

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const Cart  = useContext(PanierContext)
    const User  = useContext(userContext)
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [paiementRefuse, setPaiementRefuse] = useState(false);
    const [ErrorCarteinvalide, setErrorCarteInvalide] = useState("");


    const [panier, setPanier] = useState(Cart);
    const [clientName, setClientName] = useState("");

  
  
      const t = panier.reduce((total, article) => total + article.quantite * article.produit.Prix, 0);

    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      // Gérez la soumission du paiement ici en utilisant Stripe API
      // Utilisez stripe.createToken ou stripe.createPaymentMethod pour obtenir le token ou le paiement
  
      const cardElement = elements.getElement(CardElement);

      const { token, error } = await stripe.createToken(cardElement,{

        nameCard: clientName
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
            body: JSON.stringify({ token: token.id, montant: t,client: clientName  }),
          });
      
          if (response.ok) {
            // Le paiement a réussi, affichez un message de confirmation à l'utilisateur.
            setIsPaymentComplete(true);
            setPaiementRefuse(false);


          } else {
            // Le paiement a échoué, affichez un message d'erreur à l'utilisateur.
            setPaiementRefuse(true);

          }
        }
      
    };
  
    return (
      <>
      {isPaymentComplete ? (
        <div>
          <h2>Paiement réussi !</h2>
          <p>Merci pour votre achat.</p>
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

      <Form className='mt-5'>
        <Form.Group controlId="formCard">
        <Form.Label>Nom sur la carte</Form.Label>

        <Form.Control type="text" placeholder="Nom sur la carte"  value={clientName} onChange={e => setClientName(e.target.value)} />

       

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
        <Button className='mt-4' onClick={handleSubmit}>Payer {t} Eur</Button>
      </Form>
      </>
      </div>
      )}
      </>

    );
  }

  function Commande(){
    
  const Cart  = useContext(PanierContext)

  const [panier, setPanier] = useState(Cart);


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
                  <img className='d-block' width={0} height={50}  src={article.produit.Image[0]} />
                    {article.produit.Nom}
                </td>
                <td>{article.taille}</td>
                <td>{article.quantite}</td>
                <td>${article.produit.Prix}</td>
                <td>${article.quantite * article.produit.Prix}</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
        <h3 className='text-danger text-center ms-2'>Prix total : ${calculerTotal()}</h3>

        </>

    )
  }
  

export default function Checkout(){



    

    return (
        <Container>

            <Commande />

        <Form>
          <h2>Information de Livraison</h2>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre nom" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Prenom</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre prénom" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre prénom" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Adresse" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Code postal</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Code postal" />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrez votre Ville" />
          </Form.Group>
          {/* Ajoutez d'autres champs de livraison ici */}
          <h2 className='mt-5'>Paiement:</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Form>
      </Container>
);


}