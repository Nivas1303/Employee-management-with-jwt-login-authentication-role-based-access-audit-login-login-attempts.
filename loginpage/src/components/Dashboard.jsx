import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    dob: "",
    address: "",
    phonenumber: "",
    email: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
      return;
    }

    try {
     
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(payload.role === "ROLE_ADMIN");

      fetchEmployees(token);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/");
    }
  }, [navigate]);

  
  const authorizedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    return response;
  };

  const fetchEmployees = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/emp/allemp", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await authorizedFetch("http://localhost:8080/api/emp/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "Error creating employee ❌");
        return;
      }

      alert("Employee added successfully ✅");
      setFormData({
        firstname: "",
        lastName: "",
        dob: "",
        address: "",
        phonenumber: "",
        email: "",
      });
      fetchEmployees(localStorage.getItem("token"));
    } catch (err) {
      console.error(err);
      alert("Error adding employee ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await authorizedFetch(`http://localhost:8080/api/emp/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const msg = await response.text();
        alert(msg || "Error deleting employee ❌");
        return;
      }

      alert("Employee deleted ✅");
      fetchEmployees(localStorage.getItem("token"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Employee Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {isAdmin ? (
        <p className="role-badge admin">Welcome Admin 👑</p>
      ) : (
        <p className="role-badge user">Welcome User 👤</p>
      )}

      {/* ADMIN CREATE FORM */}
      {isAdmin && (
        <div className="form-section">
          <h3>Add New Employee</h3>
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Add Employee</button>
          </form>
        </div>
      )}

      {/* EMPLOYEE LIST */}
      <div className="employee-list">
        <h3>All Employees</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstname}</td>
                <td>{emp.lastName}</td>
                <td>{emp.dob}</td>
                <td>{emp.address}</td>
                <td>{emp.phonenumber}</td>
                <td>{emp.email}</td>
                {isAdmin && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
