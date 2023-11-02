import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function TendanceItem({ProductList,ProductDetailAction}) {
    
    return(
    
    <Card  style={{ width: '18rem',margin:"1rem" }}>
      <Card.Img  onClick={ProductDetailAction} style={{ maxWidth: '100%',height:"15rem",cursor:"pointer" }} variant="top" src={ProductList.Image[0]}  />
      <Card.Body>
        <Card.Title>{ProductList.Nom}</Card.Title>
        <Card.Title>{ProductList.Prix}€</Card.Title>
           
       
      </Card.Body>
    </Card>
    )
    
    }  