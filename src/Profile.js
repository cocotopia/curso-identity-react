import React, { useState, useEffect } from "react";

function Profile({ handleLogout }) {
  const [fullName, setFullName] = useState();

  useEffect(() => {
    window.Identity.getUserProfile()
      .then((res) => {
        const { firstName, lastName, secondLastName } = res;
        setFullName(firstName + " " + lastName + " " + secondLastName);
      })
      .catch((err) => {
        console.log("Oops algo falló", err);
      });
  }, []);

  return (
    <>
      <h1>Bienvenido {fullName}</h1>
      <button type="button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </>
  );
}

export default Profile;
