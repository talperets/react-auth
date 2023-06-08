import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function Home() {
  const nav = useNavigate();
  const { currentUser, setCurrentUser } = useContext(Context);
  useEffect(() => {
    if (!currentUser) {
      nav("/login");
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          signOut(auth)
            .then(() => {
              setCurrentUser(null);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Log Out
      </button>
    </div>
  );
}
