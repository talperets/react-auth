import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Context } from "../App";

export default function Login() {
  const { setCurrentUser } = useContext(Context);
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(true);
        nav("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErr("Wrong");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <p>{err}</p>
      <input type="email" ref={emailRef} placeholder="Email" />
      <input type="password" ref={passwordRef} placeholder="Password" />
      <div>
        <button onClick={onLogin}>Log In</button>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
