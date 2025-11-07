import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthorForm.css";

const AuthForm = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    role: "ROLE_USER",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_USER",
  });

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        alert(await response.text());
        return;
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("Login successful ✅");
      navigate("/dashboard");
    } catch {
      alert("Server error during login ❌");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword)
      return alert("Passwords do not match ❌");

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        alert(await response.text());
        return;
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("Signup successful 🎉");
      navigate("/dashboard");
    } catch {
      alert("Server error during signup ❌");
    }
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isLogin ? "login" : "signup"}`}>
          {isLogin ? "Login Form" : "Signup Form"}
        </div>
      </div>

      <div className="form-container">
        {/* Toggle Controls */}
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={() => setIsLogin(true)}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={() => setIsLogin(false)}
          />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Signup
          </label>
          <div
            className="slider-tab"
            style={{
              left: isLogin ? "0%" : "50%",
              transition: "left 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)",
            }}
          ></div>
        </div>

        {/* Forms */}
        <div className={`form-inner ${isLogin ? "show-login" : "show-signup"}`}>
          {/* LOGIN FORM */}
          <form className="login" onSubmit={handleLoginSubmit}>
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={loginData.username}
                onChange={handleLoginChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <div className="field">
              <select
                name="role"
                value={loginData.role}
                onChange={handleLoginChange}
              >
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>
            <div className="field btn">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Don't have a account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                }}
              >
                Signup now
              </a>
            </div>
          </form>

          {/* SIGNUP FORM */}
          <form className="signup" onSubmit={handleSignupSubmit}>
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={signupData.username}
                onChange={handleSignupChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={handleSignupChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
              />
            </div>
            <div className="field">
              <select
                name="role"
                value={signupData.role}
                onChange={handleSignupChange}
              >
                <option value="ROLE_USER">User</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>
            <div className="field btn">
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
