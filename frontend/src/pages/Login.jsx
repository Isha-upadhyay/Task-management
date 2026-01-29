import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/auth.jpg";
import "./Auth.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE 👉", res.data);
    login(res.data);
    console.log("AFTER LOGIN, localStorage 👉", localStorage.getItem("user"));

    if (res.data.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <img src={illustration} alt="auth" />
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Welcome back 👋</h2>
          <p>Log in to manage your tasks and track progress.</p>

          <label>Email address</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn">Sign In</button>

          <div className="link">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </div>
        </form>
      </div>
    </div>
  );
}
