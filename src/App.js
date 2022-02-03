import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./Routes/Routes";
import NavbarApp from "./Components/Navbar";
import { AuthContext } from "./Services/context";
import { login, logout } from "./Services/auth";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const setLogin = (data) => {
    if (data) {
      login(data);
      setCurrentUser(data);
    } else {
      logout();
      setCurrentUser();
    }
  };
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser: setLogin }}>
      <NavbarApp />
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
