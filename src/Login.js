import "./App.css";
import React, { useState } from "react";

function Login({ handleLogged }) {
  const [dataLogin, setDataLogin] = useState({
    emailLogin: "",
    passLogin: "",
  });

  const handleInput = (event) => {
    const { value, name } = event.target;

    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { emailLogin, passLogin } = dataLogin;
    window.Identity.login(emailLogin, passLogin, { rememberMe: true })
      .then((res) => {
        handleLogged();
      })
      .catch((err) => {
        console.log("Oops algo falló", err);
      });
  };

  return (
    <div className="App">
      <h1>Iniciar Sesión</h1>
      <form>
        <input
          type="email"
          name="emailLogin"
          placeholder="Ingresa Correo"
          required
          onChange={handleInput}
        ></input>
        <input
          type="password"
          name="passLogin"
          placeholder="Ingresa Contraseña"
          required
          onChange={handleInput}
        ></input>
        <button type="button" name="btnLogin" onClick={handleSubmit}>
          Inicar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
