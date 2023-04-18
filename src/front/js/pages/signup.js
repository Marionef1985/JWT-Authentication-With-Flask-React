import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message == "all ok") {
          navigate("/login");
        } else {
          alert("Something went wrong");
        }
      });
  };
  return (
    <>
      <input
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        type="email"
        placeholder="your email here"
      />
      <input
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        type="password"
        placeholder="your password here"
      />
      <button onClick={handleClick}>Register</button>
    </>
  );
};

export default Signup;
