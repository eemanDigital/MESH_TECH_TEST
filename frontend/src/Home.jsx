import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Home = () => {
  const { isLoggedIn } = React.useContext(AuthContext);

  console.log(isLoggedIn);

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        {/* <Link to="register">Register</Link> */}
        <Link to="login">Login</Link>
      </nav>
    </div>
  );
};

export default Home;
