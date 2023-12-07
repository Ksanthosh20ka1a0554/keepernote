import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleRegistration(event) {
    event.preventDefault();

    // Send registration request to the server
    axios
      .post("https://keepernote-server.onrender.com/register", { email, password })
      .then((response) => {
        console.log("User registered:", response.data);
        // Perform necessary actions after successful registration
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error.response.data);
        setError(error.response.data.error);
      });
  }

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleRegistration}>
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
        {error && <p className="error">{error}</p>}
        <button className="log-out" type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
