import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../images/A plus-02.jpg"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Hardcoded users list
  const users = [
    {
      email: "admin@evc.com",
      password: "admin123",
      fullName: "Alice Admin",
      role: "Admin",
    },
    {
      email: "agent1@evc.com",
      password: "agent123",
      fullName: "Bob Agent",
      role: "Agent",
    },
    {
      email: "agent2@evc.com",
      password: "pass456",
      fullName: "Carol Charger",
      role: "Agent",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password.trim()
    );

    if (!foundUser) {
      setError("Invalid email or password.");
    } else {
      console.log("✅ Login Success:", foundUser.fullName);
      if (foundUser.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/agent");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src={logo} alt="Logo" className="logo" />
          <h2>A Plus EVC Login</h2>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}
