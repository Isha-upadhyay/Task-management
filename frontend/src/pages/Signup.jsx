import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/auth.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left">
        <img src={illustration} alt="auth" />
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Create your account</h2>
          <p>Start managing your tasks efficiently</p>

          <label>Full Name</label>
          <input
            placeholder="Enter your name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            placeholder="Enter your email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 🔽 ROLE DROPDOWN (STYLED) */}
          <label>Select Role</label>
          <div style={styles.selectWrapper}>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <span style={styles.arrow}>⌄</span>
          </div>

          <button className="primary-btn">Register</button>

          <div className="link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  selectWrapper: {
    position: "relative",
    marginBottom: "20px",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    appearance: "none",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
  arrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    fontSize: "14px",
    color: "#666",
  },
};



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import illustration from "../assets/auth.jpg";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post("/auth/signup", form);
//     navigate("/role");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-left">
//         <img src={illustration} alt="auth" />
//       </div>

//       <div className="auth-right">
//         <form className="auth-card" onSubmit={handleSubmit}>
//           <h2>Create your account</h2>
//           <p>Get started with task management in seconds.</p>

//           <label>Full name</label>
//           <input onChange={(e) => setForm({ ...form, name: e.target.value })} />

//           <label>Email address</label>
//           <input onChange={(e) => setForm({ ...form, email: e.target.value })} />

//           <label>Password</label>
//           <input
//             type="password"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />

//           <button className="primary-btn">Create Account</button>

//           <div className="link">
//             Already have an account?{" "}
//             <span onClick={() => navigate("/login")}>Login</span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
