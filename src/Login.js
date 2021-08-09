import "./App.css";
import React, { useState, useEffect } from "react";
import Identity from "@arc-publishing/sdk-identity";

function Login({ handleLogged }) {
  const [dataLogin, setDataLogin] = useState({
    emailLogin: "",
    passLogin: "",
  });

  useEffect(() => {
    Identity.initFacebookLogin("287130908774061");
    if (!window.onFacebookSignOn) {
      window.onFacebookSignOn = async () => {
        try {
          await Identity.facebookSignOn();
          // props.userHasAuthenticated(true);
          handleLogged();
        } catch (e) {
          console.log(e.message);
        }
      };
    }

    // Identity.initGoogleLogin(
    //   "519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh.apps.googleusercontent.com",
    //   {
    //     width: 400,
    //     height: 40,
    //     onSuccess: (res) => {
    //       handleLogged();
    //     },
    //   }
    // );
  }, [handleLogged]);

  const handleInput = (event) => {
    const { value, name } = event.target;

    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { emailLogin, passLogin } = dataLogin;
    Identity.login(emailLogin, passLogin, { rememberMe: true })
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

      <div
        className="fb-login-button"
        data-width="320"
        data-size="large"
        data-button-type="login_with"
        data-scope="public_profile,email"
        data-auto-logout-link="false"
        data-use-continue-as="true"
        data-onlogin="window.onFacebookSignOn()"
      />

      <br />

      {/* <div id="google-sign-in-button" /> */}

      <br />

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
