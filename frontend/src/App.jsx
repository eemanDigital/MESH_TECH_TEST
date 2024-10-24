import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <AuthContext.Consumer>
                {({ isLoggedIn }) =>
                  isLoggedIn ? (
                    <Register />
                  ) : (
                    <div>
                      <h4>Login to gain access</h4>
                    </div>
                  )
                }
              </AuthContext.Consumer>
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
