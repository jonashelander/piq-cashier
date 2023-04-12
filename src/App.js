import "./styles/App.css";
import Cashier from "./components/Cashier";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import { useContext, useEffect, useState } from "react";
import LoggedInContext from "./contexts/LoggedInContext";
import LoginScreen from "./components/Login";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  function signUp() {
    //redirect to register page
    // Send requeqest to create user
  }

  return (
    <LoggedInContext.Provider value={{ loggedIn: loggedIn, setLoggedIn: setLoggedIn }}>

      <div className="container">
        {!loggedIn ?
          (
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/"
                  element={<LoginScreen />}
                />
                <Route path="/signup"
                  element={<SignUp />}
                />
              </Routes>
            </BrowserRouter>
          )
          :
          (
            <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/"
                  element={<LandingPage />}
                />
                <Route path="/deposit"
                  element={<Cashier />}
                />
                <Route path="/withdrawal"
                  element={<Cashier />}
                />
              </Routes>
            </BrowserRouter>
          )
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
