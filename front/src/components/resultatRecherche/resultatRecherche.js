// Result.js
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


function ResultatRecherche({ results,Detail,show1,closeResult }) {
    const history = useNavigate()

    function ProduitEnDetail(id){


        history(`/Product/${id}`)
    
      }
    

  return (
    <div className="result">
       <Modal show={show1} onHide={closeResult}>
       <Modal.Header closeButton>
          <Modal.Title>Résultats de la recherche</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {

            results.length > 0 &&
            
    
      <ul>
        {results.map((result) => (
            <ListGroup className='w-75 ms-5'>            
          <ListGroup.Item onClick={()=>{
            Detail()
            ProduitEnDetail(result._id)
        
        }} key={result._id}>
        <img style={{margin:"auto"}} className='w-25 d-block' src={result.Image[0]} />
        {result.Nom}
        </ListGroup.Item>          
          </ListGroup>
        ))}
      </ul>
     

      
}
</Modal.Body>
      </Modal>
    </div>
  );
}

export default ResultatRecherche;
