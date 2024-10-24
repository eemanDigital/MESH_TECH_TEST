import React, { useContext, useState } from "react";
import { useDataFetch } from "./hooks/useDataFetcher";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Register = () => {
  const { dataFetcher, data, error } = useDataFetch();
  const { isLoggedIn } = useContext(AuthContext); // Get setIsLoggedIn from AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dataFetcher("/login", "post", formData);
    if (!error && isLoggedIn) {
      navigate("/register");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label className="input-label">Username:</label>
          <input
            type="text"
            name="username"
            className="input-field"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
