//useEffect con un get a la ruta private segun yo falta crear el .js de signup tambien

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(process.env.BACKEND_URL + "/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.users) {
            setUsers(data.users);
            console.log(data);
          } else {
          }
        });
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <h1>USUARIOS:</h1>
      {users &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
    </>
  );
};

export default Private;
