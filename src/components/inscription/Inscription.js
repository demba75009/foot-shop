import Style from "./Inscription.module.css";
import { useState } from 'react';
import fetch from "isomorphic-fetch";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';



export default function Inscription(){

    const UserSchema = yup.object({

        Username: yup.string()
                     .required('Le champ est obligatoire'),


        Email:    yup.string()
                     .required('Le champ est obligatoire')
                     .email("Veuillez entrez un email valide !")
                     ,

        Password : yup.string()
        .required('Le mot de passe est obligatoire')
        .min(5, 'Mot de passe trop court')
        .max(10, 'Mot de passe trop long'),


    })

    const { register, handleSubmit,formState: { errors }} = useForm({

        defaultValues:{
        Username:"",
        Email:"",
        Password:"",

        },



    });

   
    const [ErrorEmail, setErrorEmail] = useState('')
    const [ErrorPassword, setErrorPassword] = useState('')
    const [ErrorIncorrect, setErrorIncorrect] = useState('')

    const history = useNavigate(); // Utilisé pour naviguer vers une autre route

 
    const submitSignup  = async (user) =>{
   

        UserSchema.isValid({
            Username: user.UserName,
            Email:user.Email,
            Password:user.Password
        })
       
          try {


                const response = await  fetch("http://localhost:5000/add", { method: 'POST',   
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const responseData = await response.json();
            console.log(responseData);
            
            if(responseData !== "errorEmail" && responseData !== "errorPseudo" )
            history('/');
            else 
            throw Error

        } catch (error) {
 

            console.log(error);
            

            if(error === "errorEmail")
            
             setErrorIncorrect("l'email existe déja veuillez en entre un autre")
            else 
             setErrorIncorrect("le Username existe déja veuillez en entre un autre")
        
        }
        

    } 


    return (

        <>
       <div className={`${Style.formu} w-full text-center  max-w-xs`}>
        
        <h1 className="my-20">Inscrivez - vous ! </h1>
        <p className=" my-10 text-red-500">{ErrorIncorrect}</p>
       
        <form onSubmit={ handleSubmit(submitSignup)} className={` bg-white shadow-md rounded px-8 pt-6 my-10 pb-8 mb-4`}>


            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" {...register("Username")} name="Username"  placeholder="Username"/>
            {errors?.Username && (
            <p style={{ color: 'red' }}>{errors.Username.message}</p>
          )}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" {...register("Email")} name="Email"   placeholder="email"/>
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
        
        </>

    )


}