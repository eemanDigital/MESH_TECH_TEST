import React, { useState, useContext } from "react";
import { useDataFetch } from "./hooks/useDataFetcher";
// import UserManagement from "./UserManagement";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { dataFetcher, loading, error } = useDataFetch(); // Get dataFetcher, loading, and error from useDataFetch
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    salary: "",
    age: "",
  });
  // const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger re-fetch

  //  Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dataFetcher("/register", "post", formData);

    if (response.message === "success") {
      navigate("/login");
    }

    //  Clear form data after submission
    setFormData({
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      salary: "",
      age: "",
    });
  };

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register Here</h2>

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
          <label className="input-label">First Name:</label>
          <input
            type="text"
            name="firstName"
            className="input-field"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label">Last Name:</label>
          <input
            type="text"
            name="lastName"
            className="input-field"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label">Password:</label>
          <input
            type="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label">Salary:</label>
          <input
            type="number"
            name="salary"
            className="input-field"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label">Age:</label>
          <input
            type="number"
            name="age"
            className="input-field"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
