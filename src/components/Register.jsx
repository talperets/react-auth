import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const confirmPass = useRef(null);
  const onSubmit = async (e) => {
    if (password.current.value != confirmPass.current.value) {
      setErr("Passwords are not identical");
    } else {
      e.preventDefault();
      await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          setErr("");
          const user = userCredential.user;
          console.log(user);
          nav("/login");
          // ...
        })
        .catch((error) => {
          setErr("error, try again later");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);

          // ..
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Register</h1>
      <p>{err}</p>
      <input type="email" ref={email} placeholder="Email" />
      <input type="password" ref={password} placeholder="Password" />
      <input type="password" ref={confirmPass} placeholder="Confirm Password" />
      <button onClick={onSubmit}>Register</button>
    </div>
  );
}
