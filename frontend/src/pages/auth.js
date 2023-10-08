import React, { useState } from "react";
import { database } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../pages/authcss.css";

function Auth() {
  const history = useNavigate();
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (login) {
      // Accountant login
      if (email.endsWith("@accountant.example.com")) {
        // Check the email domain
        signInWithEmailAndPassword(database, email, password)
          .then((data) => {
            console.log(data, "authData");
            history("/Accdashboard");
          })
          .catch((err) => {
            alert(err.code);
          });
      } else {
        alert("Invalid accountant credentials.");
      }
    } else {
      // Management login
      if (email.endsWith("@management.example.com")) {
        // Check the email domain
        signInWithEmailAndPassword(database, email, password)
          .then((data) => {
            console.log(data, "authData");
            history("/sitelist");
          })
          .catch((err) => {
            alert(err.code);
          });
      } else {
        alert("Invalid management credentials.");
      }
    }
  };

  return (
    <>
      <div className="row">
        <div
          className={login === false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignIn as Management
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn as Accountant
        </div>
      </div>
      <h1>{login ? "Accountant Login" : "Management Login"}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <br />
        <input type="email" name="email" placeholder="Email...." />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input type="password" name="password" placeholder="Password...." />
        <br />
        <br />
        <button>SignIn</button>
      </form>
    </>
  );
}

export default Auth;
