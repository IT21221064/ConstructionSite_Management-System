import { signOut } from "firebase/auth";
import React from "react";
import { database } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

function ManagementDashboard() {
  const history = useNavigate();
  const handleClick = () => {
    signOut(database).then((data) => {
      console.log(data, "SignIndata");
      history("/");
    });
  };
  return (
    <>
      <div>managementDashboard</div>
      <button onClick={handleClick}>Signout</button>
    </>
  );
}

export default ManagementDashboard;
