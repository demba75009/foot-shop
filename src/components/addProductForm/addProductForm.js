
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm,useFieldArray } from "react-hook-form";


export default function AddProduct (){

    const { register, handleSubmit, control, reset } = useForm({

        defaultValues:{
        Nom:"",
        Categorie:"",
        Prix:0,
        Description:"",
        Stock:""

        }

    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'Image', // Replace 'Image' with your Image name
      });


    async function  submitAdd(Produit){

        const imageArrayEach = Produit.Image
        const imageArray = []

        for (let i = 0; i < imageArrayEach .length; i++) {
            imageArray.push(imageArrayEach [i].Image)
          }
          
          Produit.Image = imageArray
        try{

            
            const response = await  fetch("http://localhost:5000/products/add", { method: 'POST',   
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(Produit)
        })

        const responseData = await response.json();
        console.log(responseData);


        }

        catch(e){

            throw Error
        }

                
        
    }

    return(

        <div className={`w-full text-center  mt-5`}>
        
        <h1 className="my-20">Ajouter un produit </h1>
        {/* <p className=" my-10 text-red-500">{ErrorIncorrect}</p> */}
       
        <form onSubmit={handleSubmit(submitAdd)} className={` bg-white shadow-md rounded mt-5`}>


            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categorie">
                Catégorie
        :    </label>
            <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Categorie" type="text" {...register("Categorie")} name="Categorie"  placeholder="Categorie"/>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                Nom
           : </label>
            <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Nom" type="text" {...register("Nom")} name="Nom"  placeholder="Nom"/>
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                Prix
          :  </label>
            <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Prix" type="number" {...register("Prix")} name="Prix"   placeholder="Prix"/>

            {/* <p className="text-red-500">{ErrorPrix}</p> */}
            </div>

            {fields.map((Image, index) => (
                    <div key={Image.id}>
                    <input
                        {...register(`Image[${index}].Image`)} // Replace 'Image' and 'Image1' with your Image names
                        defaultValue={Image.Image1} // If you want to set initial values
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                    </div>
                ))}
                <button type="button" onClick={() => append({})}>
                    Add Image
                </button>
            

            <div className="mb-4 d-flex justify-content-center align-items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                Description
        :    </label>
            <textarea cols={30} rows={10} className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Description" type="text" 
            {...register("Description")}
            name="Description"   placeholder="Description"/>

            {/* <p className="text-red-500">{ErrorPrix}</p> */}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nom">
                Stock
         :   </label>
            <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Description" type="number" 
            {...register("Stock")}
            name="Stock" placeholder="Stock"/>

            {/* <p className="text-red-500">{ErrorPrix}</p> */}
            </div>


            <div className="flex items-center justify-between">
            <button  className="btn btn-outline-info" type="submit">
                Add
            </button>
         
            </div>
        </form>
 
</div>
    )


}



// <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Image">
//                     Image1
//             :    </label>
//                 <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image" type="text" {...register("Image[0]")} name="Image" placeholder="Https//"/>


//                 {/* <p className="text-red-500">{ErrorImage}</p> */}

//             </div>
         
//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Image2">
//                     Image2
//             :    </label>
//                 <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image2" type="text" {...register("Image[1]")} name="Image2" placeholder="Https//"/>


//                 {/* <p className="text-red-500">{ErrorImage}</p> */}

//             </div>

//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Image3">
//                     Image3
//             :    </label>
//                 <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image3" type="text" {...register("Image[2]")} 
//                  name="Image3" placeholder="Https//"/>


//                 {/* <p className="text-red-500">{ErrorImage}</p> */}

//             </div>

//             <div className="mb-6">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Image4">
//                     Image4
//             :    </label>
//                 <input className="shadow ms-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="Image4" type="text" {...register("Image[3]")} name="Image4" placeholder="Https//"/>


//                 {/* <p className="text-red-500">{ErrorImage}</p> */}

//             </div>