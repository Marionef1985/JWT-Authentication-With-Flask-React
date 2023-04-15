import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = () =>{
        fetch(process.env.BACKEND_URL + "api/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(res => res.json())
        .then(response => {
            if (response.token){
                localStorage.setItem("token", response.token)
                navigate("/private")
            } else {
                alert("Something went wrong")
            }
        })
    }
  return (
    <>
      <input 
      onChange={(event)=>{setEmail(event.target.value)}}
      type="email" 
      placeholder="your email here" />
      <input 
      onChange={(event)=>{setPassword(event.target.value)}}
      type="password" 
      placeholder="your password here" />
      <button onClick={handleClick()}>Login</button>
    </>
  );
};

export default Login;
