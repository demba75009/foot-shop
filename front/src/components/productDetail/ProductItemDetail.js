import { useState } from "react"
import Style from "./ProductItemDetail.module.css"
import Button from 'react-bootstrap/Button';

export default function ProductsItemDetail({ProductList,ProductDetailAction,ProductAddPanier,ChangeSize,ChangeQuantité,Taille}) {
    
  const [image, setimage] = useState(ProductList.Image[0])

  const [zoomed, setZoomed] = useState(false);

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

    return(
    

        <div onClick={ProductDetailAction} className={`${Style.item}  mt-5`}>

            <div className="ms-2 mb-2">
              

          <div className="ImageDesign d-lg-flex "> 
            <img onClick={toggleZoom} className={`image-zoom ${zoomed ? 'zoomed' : ''} ${Style.img}`} src={image} alt={ProductList.Image[0]}/>
        
            <hr />
            
            <div className={`${Style.imgGrille}  flex-lg-column mt-5 ms-2`}> 

            <div>

                <h1>{ProductList.Nom}</h1>
                      
                <h2>Prix: {ProductList.Prix} € </h2>

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
                   <div className="d-flex justify-content-center"> 
                
                        
                        <p className="mt-4 ms-2">Taille:</p>

                      <select value={Taille} onChange={(e)=>ChangeSize(e.target.value)} className="mt-4 ms-2 h-25" id="taille">
                          <option value="xs">Taille XS</option>
                          <option value="s">Taille S</option>
                          <option value="m">Taille M</option>
                          <option value="l">Taille L</option>
                          <option value="xl">Taille XL</option>
                      </select>

                      <p className="mt-4 ms-2">Quantité:</p>
                      <select className="mt-4 me-2 ms-2 h-25"  onChange={(e) => ChangeQuantité(e.target.value)}>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                  </select>

      </div>
                

        <div className="cointainer text-center ">

                  <Button className="mx-auto" onClick={ProductAddPanier} style={{marginBottom:"1rem",marginTop:"1rem"}} variant="success">Ajoutez au panier</Button>

                  <h2 className="text-center"> Descriptif technique : </h2>

                  <p className="text-center ">
                  {ProductList.Description}
                  </p>
          
          </div>
              </div>






            
            </div>
                

           </div>       
             
              
              </div>
             
           

           
      </div>
    )
    
    } 