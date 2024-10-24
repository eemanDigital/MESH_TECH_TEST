import { useNavigate } from "react-router-dom";
import { useDataFetch } from "./hooks/useDataFetcher";
import React, { useState, useEffect } from "react";

const UserManagement = ({ refreshTrigger }) => {
  const [searchType, setSearchType] = useState("all");
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    minSalary: "",
    maxSalary: "",
    minAge: "",
    maxAge: "",
  });
  const { dataFetcher, loading, error, data } = useDataFetch();
  const navigate = useNavigate();

  // Handle search type change
  const handleSearchTypeChange = (e) => {
    const value = e.target.value;
    setSearchType(value);
    setSearchParams({
      firstName: "",
      lastName: "",
      userId: "",
      minSalary: "",
      maxSalary: "",
      minAge: "",
      maxAge: "",
    });
    if (value === "all") dataFetcher("/");
    if (value === "neverSignedIn") dataFetcher("/never-signedIn");
    if (value === "registeredToday") dataFetcher("/register-today");
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    switch (searchType) {
      case "name":
        dataFetcher(
          `/search-by-name?firstName=${searchParams.firstName}&lastName=${searchParams.lastName}`
        );
        break;
      case "id":
        dataFetcher(`/search-by-id?userId=${searchParams.userId}`);
        break;
      case "salary":
        dataFetcher(
          `/search-by-salaryRange?min=${searchParams.minSalary}&max=${searchParams.maxSalary}`
        );
        break;
      case "age":
        dataFetcher(
          `/search-by-ageRange?min=${searchParams.minAge}&max=${searchParams.maxAge}`
        );
        break;
      case "registerAfter":
        dataFetcher(`/registeredafter/${searchParams.userId}`);
        break;
      case "sameDateRegistration":
        dataFetcher(`/user-with-same-registration/${searchParams.userId}`);
        break;
      default:
        break;
    }
  };

  // Load all users on component mount
  useEffect(() => {
    dataFetcher("/");
  }, [dataFetcher, refreshTrigger]);

  // if no data, display message
  {
    data?.users?.length === 0 && <div className="no-data">No users found</div>;
  }

  //logout user handler
  const logout = async () => {
    await dataFetcher("/logout");
    navigate("/login");
  };

  const renderSearchForm = () => {
    switch (searchType) {
      case "name":
        return (
          <div className="search-inputs">
            <input
              type="text"
              placeholder="First Name"
              value={searchParams.firstName}
              onChange={(e) =>
                setSearchParams({ ...searchParams, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={searchParams.lastName}
              onChange={(e) =>
                setSearchParams({ ...searchParams, lastName: e.target.value })
              }
            />
          </div>
        );
      case "id":
        return (
          <div className="search-inputs">
            <input
              type="text"
              placeholder="User ID"
              value={searchParams.userId}
              onChange={(e) =>
                setSearchParams({ ...searchParams, userId: e.target.value })
              }
            />
          </div>
        );
      case "salary":
        return (
          <div className="search-inputs">
            <input
              type="number"
              placeholder="Min Salary"
              value={searchParams.minSalary}
              onChange={(e) =>
                setSearchParams({ ...searchParams, minSalary: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max Salary"
              value={searchParams.maxSalary}
              onChange={(e) =>
                setSearchParams({ ...searchParams, maxSalary: e.target.value })
              }
            />
          </div>
        );
      case "age":
        return (
          <div className="search-inputs">
            <input
              type="number"
              placeholder="Min Age"
              value={searchParams.minAge}
              onChange={(e) =>
                setSearchParams({ ...searchParams, minAge: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max Age"
              value={searchParams.maxAge}
              onChange={(e) =>
                setSearchParams({ ...searchParams, maxAge: e.target.value })
              }
            />
          </div>
        );
      case "registerAfter":
      case "sameDateRegistration":
        return (
          <div className="search-inputs">
            <input
              type="text"
              placeholder="User ID"
              value={searchParams.userId}
              onChange={(e) =>
                setSearchParams({ ...searchParams, userId: e.target.value })
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-management">
      <div className="container">
        <h1>User Management</h1>

        <div className="search-section">
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="all">All Users</option>
            <option value="name">Search by Name</option>
            <option value="id">Search by ID</option>
            <option value="salary">Search by Salary Range</option>
            <option value="age">Search by Age Range</option>
            <option value="neverSignedIn">Never Signed In</option>
            <option value="registeredToday">Registered Today</option>
            <option value="registerAfter">Registered Users After</option>
            <option value="sameDateRegistration">
              Registered Users On Same Date
            </option>
          </select>

          <form onSubmit={handleSearch}>
            {renderSearchForm()}
            {[
              "name",
              "id",
              "salary",
              "age",
              "registerAfter",
              "sameDateRegistration",
            ].includes(searchType) && (
              <button type="submit" className="search-button">
                Search
              </button>
            )}
          </form>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="table-container">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Salary</th>
                  <th>Register Date</th>
                  <th>Last Sign In</th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>₦{user.salary.toLocaleString()}</td>
                    <td>{new Date(user.registerday).toLocaleDateString()}</td>
                    <td>
                      {user.signintime
                        ? new Date(user.signintime).toLocaleString()
                        : "yet to sign in"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
