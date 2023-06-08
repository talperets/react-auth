import React, { useContext, useEffect } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

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
          setCurrentUser(null);
        }}
      >
        Log Out
      </button>
    </div>
  );
}
