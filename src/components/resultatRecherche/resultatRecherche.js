// Result.js
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';


function ResultatRecherche({ results,Detail }) {
    const history = useNavigate()

    function ProduitEnDetail(id){


        history(`/Product/${id}`)
    
      }
    

  return (
    <div className="result">
        {

            results.length > 0 &&
            
    
      <ul>
        {results.map((result) => (
            <ListGroup className='w-50 ms-5'>            
          <ListGroup.Item onClick={()=>{
            Detail()
            ProduitEnDetail(result._id)
        
        }} key={result._id}>{result.Nom}</ListGroup.Item>          
          </ListGroup>
        ))}
      </ul>
     

      
}
    </div>
  );
}

export default ResultatRecherche;
