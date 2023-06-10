import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Context } from "../App";

export default function Login() {
  const provider = new GoogleAuthProvider();
  const { setCurrentUser } = useContext(Context);
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const google = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setCurrentUser(true);
        nav("/");
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setErr("Wrong");
      });
  };
  const onLogin = () => {
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
  const onLogin2 = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      // Signed in
      setCurrentUser(true);
      nav("/");
    } catch (error) {
      console.log(error);
    }
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
        <button onClick={onLogin2}>Log In</button>
        <button onClick={google}>Google</button>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}
