import Style from "./Connexion.module.css";
import { useState } from 'react';
import fetch from "isomorphic-fetch";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Connexion({updateUser}){




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

    
       
        UserSchema.isValid({
            Email:user.Email,
            Password:user.Password
        })
         

     
          try {


          const response = await  fetch("https://foot-shop-back.vercel.app/connexion", { method: 'POST',   
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
        updateUser(user25)
        toast.success(`Bienvenue ${userProfilOK.Username}!`,{

            autoClose:500,
          
            onClose:()=>{
                setTimeout(() => {

                history('/');
                },100)
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


        <h1 className="mt-5">Connectez - vous ! </h1>
        <p className="mt-5 text-red-500">{ErrorIncorrect}</p>

        <form onSubmit={ handleSubmit(submitSignup)} className={` container shadow-md rounded `}>


         
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
            </label>
            <input className="shadow appearance-none border rounded ms-2 focus:outline-none focus:shadow-outline" id="email" type="email"  {...register("Email")} name="Email"placeholder="email"/>

            {errors?.Email && (
            <p style={{ color: 'red' }}>{errors.Email.message}</p>
          )}
            </div>


            <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input className="shadow appearance-none border rounded ms-2 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" {...register("Password")} name="Password" placeholder="******************"/>
            {errors?.Password && (
            <p style={{ color: 'red' }}>{errors.Password.message}</p>
          )}

            </div>
            <div className=" mt-5 text-center">
            <button  className="btn btn-outline-info" type="submit">
                Sign Up
            </button>
         
            </div>
        </form>
 
</div>
<ToastContainer />

        
        </>

    )


}