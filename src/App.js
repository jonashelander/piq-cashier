import "./styles/App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react"; // <-- useContext här!
import LoggedInContext from "./contexts/LoggedInContext";
import Login from "./components/Login";
import UserContext from "./contexts/UserContext";
import { authUser } from "./api/authApi";

function ProtectedRoute({ element }) {
  const { loggedIn } = useContext(LoggedInContext);
  return loggedIn ? element : <Navigate to="/" />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authDTO = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
    };

    authUser(authDTO)
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error("Auth failed:", err);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoggedInContext.Provider value={{ loggedIn, setLoggedIn }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {!loggedIn ? (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute element={<Dashboard />} />}
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </LoggedInContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
