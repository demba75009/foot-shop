import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function ProductsItem({ProductList,ProductDetailAction,ProductAddPanier,ProductDeletePanier}) {
    
    return(
    
    <Card  style={{ width: '18rem',margin:"1rem" }}>
      <Card.Img  onClick={ProductDetailAction} style={{ maxWidth: '100%',height:"15rem",cursor:"pointer" }} variant="top" src={ProductList.Image[0]}  />
      <Card.Body>
        <Card.Title>{ProductList.Nom}</Card.Title>
        <Card.Title>{ProductList.Prix}€</Card.Title>


        {
          !ProductList.InPanier ? (

              <Button onClick={ProductAddPanier} style={{marginBottom:"1rem",marginTop:"1rem"}} variant="success">Ajoutez au panier</Button>

            
          
          )
          :
          <Button onClick={ProductDeletePanier} style={{marginBottom:"1rem",marginTop:"1rem"}} variant="danger">Retirer du Panier</Button>

        }
           
       
      </Card.Body>
    </Card>
    )
    
    }  