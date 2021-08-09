import React, { useState } from "react";
import Identity from '@arc-publishing/sdk-identity';

function Register({ handleLogged }) {
  const [dataRegister, setDataRegister] = useState({
    emailReg: "",
    passReg: "",
    nameReg: "",
    lastNameReg: "",
    secondLastNameReg: "",
    phoneReg: "",
    typeDocReg: "",
    NumDocReg: "",
  });

  const handleInput = (event) => {
    const { value, name } = event.target;

    setDataRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const hanbleSubmit = () => {
    const {
      emailReg,
      passReg,
      nameReg,
      lastNameReg,
      secondLastNameReg,
      phoneReg,
      typeDocReg,
      NumDocReg,
    } = dataRegister;

    Identity.signUp(
      {
        userName: emailReg,
        credentials: passReg,
        password: "password",
      },
      {
        firstName: nameReg,
        lastName: lastNameReg,
        secondLastName: secondLastNameReg,
        displayName: emailReg,
        email: emailReg,
        contacts: [
          {
            phone: phoneReg,
            type: "HOME",
          },
        ],
        attributes: [
          {
            name: "typeDocument",
            value: typeDocReg,
            type: "String",
          },
          {
            name: "document",
            value: NumDocReg,
            type: "String",
          },
        ],
      },
      { doLogin: true },
      { rememberMe: true }
    )
      .then((res) => {
        handleLogged();
      })
      .catch((err) => {
        console.log("Oops algo falló", err);
      });
  };

  return (
    <>
      <h1>Regístrate</h1>
      <form>
        <input
          type="email"
          name="emailReg"
          placeholder="Ingresar Correo"
          onChange={handleInput}
        />
        <br />
        <input
          type="password"
          name="passReg"
          placeholder="Ingresar Contraseña"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="nameReg"
          placeholder="Ingresa Nombre(s)"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="lastNameReg"
          placeholder="Ingresa Apellido paterno"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="secondLastNameReg"
          placeholder="Ingresa Apellido materno"
          onChange={handleInput}
        />
        <br />
        <input
          type="phone"
          name="phoneReg"
          placeholder="Ingresa Teléfono/Celular"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="typeDocReg"
          placeholder="Tipo Documento"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="NumDocReg"
          placeholder="Número Documento"
          onChange={handleInput}
          maxLength="8"
        />
        <br />
        <button type="button" onClick={hanbleSubmit}>
          Registrarse!
        </button>
      </form>
    </>
  );
}

export default Register;
