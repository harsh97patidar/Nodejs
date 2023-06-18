import React, { useEffect } from "react";

import "./login.css";

const Login = () => {
  const handleCredentialResponse = (response) => {
    const token = response.credential;

    console.log("token", token);
  };

  window.google?.accounts?.id?.initialize({
    client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
    callback: handleCredentialResponse,
    cancel_on_tap_outside: false,
  });

  useEffect(() => {
    window.google?.accounts?.id?.renderButton(
      document.getElementById("my-signIn"),
      {
        theme: "filled_blue",
        type: "standard",
        size: "large",
        width: 300, // windowSize.width <= MOBILE_VIEW_WIDTH ? 200 : 300,
      }
    );
    window.google?.accounts?.id?.prompt();
  }, []);

  console.log("comming in login");

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1 className="app-title">
          Join the community and start posting today!.
        </h1>
        <div id="my-signIn" />
      </div>
    </div>
  );
};

export default Login;
