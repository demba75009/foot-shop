import Style from "./Inscription.module.css";
import { useState } from 'react';
import fetch from "isomorphic-fetch";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Inscription(){

    const UserSchema = yup.object({

        Username: yup.string()
                     .required('Le champ est obligatoire'),
        Nom: yup.string()
                     .required('Le champ est obligatoire'),
        Prenom: yup.string()
                     .required('Le champ est obligatoire'),
        DateBirth: yup.string()
                     .required('Le champ est obligatoire'),
        Ville: yup.string()
                     .required('Le champ est obligatoire'),
        Mobile: yup.string()
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
        Nom:"",
        Prenom:"",
        DateBirth:"",
        Ville:"",
        Mobile:"",
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
            Nom:user.Nom,
            Prenom:user.Prenom,
            DateBirth:user.DateBirth,
            Ville:user.Ville,
            Mobile:user.Mobile,           
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
            setErrorEmail(responseData)
            
            if(responseData !== "errorEmail" && responseData !== "errorPseudo" )
            toast.success(`Inscription Validé!`,{

              autoClose:500,
            
              onClose:()=>{
                  setTimeout(() => {
  
                  history('/signin');
                  },1000)
              }
          });   else 
            throw Error

        } catch (error) {
 

            console.log(error);
            

            if(ErrorEmail === "errorEmail")
            
             setErrorIncorrect("l'email existe déja veuillez en entre un autre")
            else if(ErrorEmail === "errorPseudo")
             setErrorIncorrect("le userName existe déja veuillez en entre un autre")
        
        }
        

    } 


    return (

        <>
      <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
        
        <h1 className="text-center">Inscrivez - vous ! </h1>
        <p className=" my-10 text-danger">{ErrorIncorrect}</p>
       
        <Form onSubmit={ handleSubmit(submitSignup)} >


            <Form.Group>
            <Form.Label  htmlFor="username">
                Username
            </Form.Label>
            <Form.Control  id="username" type="text" {...register("Username")} name="Username"  placeholder="Username"/>
            {errors?.Username && (
            <p style={{ color: 'red' }}>{errors.Username.message}</p>
          )}
            </Form.Group>
            <Form.Group>
            <Form.Label  htmlFor="Nom">
                Nom
            </Form.Label>
            <Form.Control  id="Nom" type="text" {...register("Nom")} name="Nom"  placeholder="Nom"/>
            {errors?.Nom && (
            <p style={{ color: 'red' }}>{errors.Nom.message}</p>
          )}
            </Form.Group>

            <Form.Group>
            <Form.Label  htmlFor="Prenom">
                Prenom
            </Form.Label>
            <Form.Control  id="Prenom" type="text" {...register("Prenom")} name="Prenom"  placeholder="Prenom"/>
            {errors?.Prenom && (
            <p style={{ color: 'red' }}>{errors.Prenom.message}</p>
          )}
            </Form.Group>

            <Form.Group>
            <Form.Label  htmlFor="DateBirth">
                Date de Naissance
            </Form.Label>
            <Form.Control  id="DateBirth" type="text" {...register("DateBirth")} name="DateBirth"  placeholder="DateBirth"/>
            {errors?.DateBirth && (
            <p style={{ color: 'red' }}>{errors.DateBirth.message}</p>
          )}
            </Form.Group>

            <Form.Group>
            <Form.Label  htmlFor="Ville">
                Ville            
            </Form.Label>
            <Form.Control  id="Ville" type="text" {...register("Ville")} name="Ville"  placeholder="Ville"/>
            {errors?.Ville && (
            <p style={{ color: 'red' }}>{errors.Ville.message}</p>
          )}
            </Form.Group>

            <Form.Group>
            <Form.Label  htmlFor="Mobile">
              Portable            
            </Form.Label>
            <Form.Control  id="Ville" type="text" {...register("Mobile")} name="Mobile"  placeholder="Mobile"/>
            {errors?.Mobile && (
            <p style={{ color: 'red' }}>{errors.Mobile.message}</p>
          )}
            </Form.Group>

            <Form.Group>
            <Form.Label  htmlFor="username">
                Email
            </Form.Label>
            <Form.Control  id="email" type="email" {...register("Email")} name="Email"   placeholder="email"/>
            {errors?.Email && (
            <p style={{ color: 'red' }}>{errors.Email.message}</p>
          )}

            </Form.Group>


            <Form.Group>
            <Form.Label  htmlFor="password">
                Password
            </Form.Label>
            <Form.Control className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" {...register("Password")} name="Password" placeholder="******************"/>


            {errors?.Password && (
            <p style={{ color: 'red' }}>{errors.Password.message}</p>
          )}
            </Form.Group>

            <div className="text-center mt-5"> 

            <Button className="mx-auto" variant="primary" type="submit">
              S'inscrire
            </Button>

            </div>

         
        </Form>
 
        </Col>
      </Row>
    </Container>   
    <ToastContainer />
     
        </>

    )


}