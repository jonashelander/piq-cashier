import "./styles/App.css";
import Cashier from "./components/Cashier";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import { useEffect, useState } from "react";
import LoggedInContext from "./contexts/LoggedInContext";


function App() {


  const [loggedIn, setLoggedIn] = useState(false);

  function signUp() {
    // Send requeqest to create user
  }

  return (
    <LoggedInContext.Provider value={{ loggedIn: loggedIn, setLoggedIn: setLoggedIn }}>

      <div className="container">
        <Navbar />
        {loggedIn ?
          <BrowserRouter>
            <Routes>
              <Route
                path="/" element={<LandingPage />}
              />
            </Routes>
          </BrowserRouter>
          :
          <BrowserRouter>
            <Routes>
              <Route path="/"
                element={<Cashier />}
              />
            </Routes>
          </BrowserRouter>
        }

        {/* <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
        <Routes>
        <Route path="/"
        element={
          <LandingPage />
        } />
        <Route path="/cashier"
        element={
          <PrivateRoute>
          <Cashier />
          </PrivateRoute>
        } />
        </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider> */}
      </div >
    </LoggedInContext.Provider>
  );
}

export default App;
