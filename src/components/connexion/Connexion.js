import Style from "./Connexion.module.css";
import { useState } from 'react';
import fetch from "isomorphic-fetch";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Connexion(){




    const UserSchema = yup.object({

       


        Email:    yup.string()
                     .required('Le champ est obligatoire')
                     .email("Veuillez entrez un email valide !")
                     ,

        Password : yup.string()
        .required('Le mot de passe est obligatoire')
        .min(5, 'Mot de passe trop court')
        .max(10, 'Mot de passe trop long'),


    })

    
    const [ErrorIncorrect, setErrorIncorrect] = useState('')

    const { register, handleSubmit,formState: { errors }} = useForm({

        defaultValues:{
        Email:"",
        Password:"",

        },



    });



    const history = useNavigate(); // Utilisé pour naviguer vers une autre route

 
    const submitSignup  = async (user) =>{

    
        console.log(user);
       
        UserSchema.isValid({
            Email:user.Email,
            Password:user.Password
        })
         

     
          try {


          const response = await  fetch("http://localhost:5000/connexion", { method: 'POST',   
          headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
       })

       const responseData = await response.json();

       const user25 = JSON.stringify(responseData.userAuth)

       const userProfilOK = JSON.parse(user25)
       
       const token = responseData.token;

       localStorage.setItem('token', token);
       localStorage.setItem('user', user25);



       if(responseData !== "error")
       {
        toast.success(`Bienvenue ${userProfilOK.Username}!`,{

            autoClose:500,
          
            onClose:()=>{
                setTimeout(() => {

                history('/');
                },1000)
            }
        });

       }
       else 
        throw Error

     } catch (error) {
       console.log(error);
       setErrorIncorrect("mot de passe ou email incorrect")
     }
 
        

    } 


    return (

        <>
       <div className={`${Style.formu} w-full text-center  max-w-xs`}>


        <h1 className="my-20">Connectez - vous ! </h1>
        <p className="my-10 text-red-500">{ErrorIncorrect}</p>

        <form onSubmit={ handleSubmit(submitSignup)} className={` bg-white shadow-md rounded px-8 pt-6 my-10 pb-8 mb-4`}>


         
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email"  {...register("Email")} name="Email"placeholder="email"/>

            {errors?.Email && (
            <p style={{ color: 'red' }}>{errors.Email.message}</p>
          )}
            </div>


            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" {...register("Password")} name="Password" placeholder="******************"/>
            {errors?.Password && (
            <p style={{ color: 'red' }}>{errors.Password.message}</p>
          )}

            </div>
            <div className="flex items-center justify-between">
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign Up
            </button>
         
            </div>
        </form>
 
</div>
<ToastContainer />

        
        </>

    )


}