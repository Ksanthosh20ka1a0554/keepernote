import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from 'react-spinners';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="login-container card text-center mt-5 border-warning border-4 p-2" style={{width: "20rem"}}>
    <div className="card-body">
      <h2 className="card-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mt-4">
          <input
            type="email"
            className="form-control border-warning"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          /> 
        </div>
        <div className="form-group mt-4">
          <input
            type="password"
            className="form-control border-warning"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        {loading && 
        <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
        >
          <BounceLoader color="#f5ba13" cssOverride={{}} size={500} />
        </div>}
        {error && <p className="error">{error}</p>}
        <button className="log-out mt-4" type="submit">Submit</button>
        <p className="mt-4">
          New user? <Link to="/register">Register here</Link>
        </p>
      </form>
      
    </div>
    </div>
  );
}

export default Login;
