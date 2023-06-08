import React, { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
export const Context = React.createContext();
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
