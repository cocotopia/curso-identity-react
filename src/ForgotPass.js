import "./App.css";
import React, { useState } from "react";
import Identity from '@arc-publishing/sdk-identity';

function ForgotPass() {
  const [sendEmail, sendSendEmail] = useState();
  const [dataForgot, setDataForgot] = useState({
    emailForgot: "",
  });

  const handleInput = (event) => {
    const { value, name } = event.target;

    setDataForgot({
      ...dataForgot,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { emailForgot } = dataForgot;
    Identity.requestResetPassword(emailForgot)
      .then((res) => {
        sendSendEmail(true);
      })
      .catch((err) => {
        console.log("Oops algo falló", err);
      });
  };

  return (
    <div className="App">
      <h1>Olvidé mi Contraseña</h1>
      {sendEmail ? (
        <p>Revisa tu bandeja de correo para cambiar tu contraseña</p>
      ) : (
        <form>
          <input
            type="email"
            name="emailForgot"
            placeholder="Ingresa Correo"
            required
            onChange={handleInput}
          ></input>
          <button type="button" name="btnLogin" onClick={handleSubmit}>
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPass;
