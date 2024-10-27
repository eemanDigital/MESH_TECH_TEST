import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import UserManagement from "./UserManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/users-list"
            element={
              <AuthContext.Consumer>
                {({ isLoggedIn }) =>
                  isLoggedIn ? (
                    <UserManagement />
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
