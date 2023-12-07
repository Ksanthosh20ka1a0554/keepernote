import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from 'react-spinners';
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    // Send login request to the server
    axios
      .post("https://keepernote-server.onrender.com/login", { email, password })
      .then((response) => {
        console.log("User logged in:", response.data);
        // Perform necessary actions after successful login
        navigate(`/notes/${response.data.user.email}`);
      })
      .catch((error) => {
        console.error("Error logging in:", error.response.data);
        setError(error.response.data.error);
      })
      .finally(() => {
        // Set loading to false after request is complete
        setLoading(false);
      });
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {loading && 
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
        >
          <BounceLoader color="#f5ba13" cssOverride={{}} size={500} />
        </div>}
        {error && <p className="error">{error}</p>}
        <button className="log-out" type="submit">Login</button>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
