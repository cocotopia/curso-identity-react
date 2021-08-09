import "./App.css";

import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ForgotPass from "./ForgotPass";

import React, { useState, useEffect } from "react";
import Identity from '@arc-publishing/sdk-identity';

function App() {
  const UrlBase = "https://api-sandbox.elcomercio.pe";

  const urlSDK =
    "https://arc-subs-sdk.s3.amazonaws.com/sandbox/sdk-identity.min.js";

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const sdkIdentity = document.createElement("script");
    sdkIdentity.src = urlSDK;
    sdkIdentity.onload = function () {
      Identity.apiOrigin = UrlBase;
      Identity.isLoggedIn()
        .then((res) => {
          if (res === true) {
            setIsLogged(true);
          }
        })
        .catch((err) => {
          console.log("Oops algo falló", err);
        });
    };
    document.body.appendChild(sdkIdentity);
  }, []);

  const handleLogout = () => {
    Identity.logout().then((res) => {
      setIsLogged(false);
    });
  };

  const handleLogged = () => {
    Identity.isLoggedIn()
      .then((res) => {
        if (res === true) {
          setIsLogged(true);
        }
      })
      .catch((err) => {
        console.log("Oops algo falló", err);
      });
  };

  return (
    <div className="App">
      {isLogged ? (
        <Profile handleLogout={handleLogout} />
      ) : (
        <>
          <Login handleLogged={handleLogged} />
          <ForgotPass />
          <Register handleLogged={handleLogged} />
        </>
      )}
    </div>
  );
}

export default App;
