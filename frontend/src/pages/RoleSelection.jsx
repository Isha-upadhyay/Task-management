import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import illustration from "../assets/auth.jpg"; // any illustration

export default function RoleSelection() {
  const { user } = useAuth();
  const navigate = useNavigate();
    
  const goNext = () => {
    if (user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={illustration} alt="auth" />
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Choose Your Role</h2>
          <p>Select how you want to use the dashboard.</p>

          <div style={{ display: "flex", gap: 20 }}>
            <div
              style={card}
              onClick={() => selectRole("admin")}
            >
              <h3>Admin</h3>
              <p>Create, assign, and manage tasks.</p>
              <button className="primary-btn">Continue as Admin</button>
            </div>

            <div
              style={card}
                onClick={() => selectRole("user")}
            >
              <h3>User</h3>
              <p>View and manage assigned tasks.</p>
              <button className="primary-btn">Continue as User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: 20,
  borderRadius: 12,
  cursor: "pointer",
};
