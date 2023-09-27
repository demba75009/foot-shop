import { useState } from "react"
import Style from "./ProductItemDetail.module.css"
import Button from 'react-bootstrap/Button';

export default function ProductsItemDetail({ProductList,ProductDetailAction}) {
    
  const [image, setimage] = useState(ProductList.Image[0])

    return(
    

        <div onClick={ProductDetailAction} className={`${Style.item} mt-5`}>

            <div className="ms-2 mb-2">
                  <h1> 
                     {ProductList.Nom}

                  </h1>
              <div className="px-6 pt-4 pb-2 ">
                      <h2 >
                        
                        Prix: {ProductList.Prix} $ </h2>

              </div>

          <div className="ImageDesign d-lg-flex "> 
            <img className={` ${Style.img}`} src={image} alt={ProductList.Image[0]}/>
        
            <hr />
            
            <div className={`${Style.imgGrille}  flex-lg-column mt-5`}> 


                <img onClick={()=>setimage(ProductList.Image[0])} className={`  w-1/4`} src={ProductList.Image[0]} alt={ProductList.Image[0]}/>  

                { ProductList.Image.length > 1 ? (
                  
                  <>
                      <img onClick={()=>setimage(ProductList.Image[1])} className={`  w-1/4`} src={ProductList.Image[1]} alt={ProductList.Image[1]}/>    
                      
                          { ProductList.Image.length > 2 ? (

                            <> 
                            
                                <img onClick={()=>setimage(ProductList.Image[2])} className={`  w-1/4`} src={ProductList.Image[2]} alt={ProductList.Image[2]}/>     
                              {
                                  ProductList.Image.length > 3 ? (

                                    <img onClick={()=>setimage(ProductList.Image[3])} className={`  w-1/4`} src={ProductList.Image[3]} alt={ProductList.Image[3]}/>     


                                  ) :""


                              }
                            
                            </>


                          ) : ""


                          }
                      
                  </>
                  

                )

                :""



                }





            
            </div>
                

           </div>       
                <div className="d-flex justify-content-center"> 
                
                        <Button style={{marginBottom:"1rem",marginTop:"1rem"}} variant="success">Ajoutez au panier</Button>
                                          
                <div>


                  <h2> Descriptif technique : </h2>

                  <p>
                  {ProductList.Description}
                  </p>
                  
                  </div>
              
              </div>
             
           
          </div>

           
      </div>
    )
    
    } 