import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.includes("dashboard");
  const isTasks = location.pathname.includes("tasks");

  return (
    <aside style={styles.sidebar}>
      {/* LOGO */}
      <div>
        <h2 style={styles.logo}>Task Management</h2>

        {/* NAV */}
        <nav style={styles.nav}>
          <NavItem
            label="Dashboard"
            active={isDashboard}
            to={`/${user.role}/dashboard`}
          />

        
            <NavItem
              label="Tasks"
              active={isTasks}
              to={`/${user.role}/tasks`}
            />
     
        </nav>
      </div>

      {/* LOGOUT */}
      <div style={styles.logoutWrap}>
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

/* 🔹 NAV ITEM COMPONENT */
function NavItem({ label, to, active }) {
  return (
    <NavLink
      to={to}
      style={{
        ...styles.navItem,
        ...(active ? styles.activeItem : {}),
      }}
    >
      {label}
    </NavLink>
  );
}

/* 🎨 FIGMA-STYLE INLINE CSS */
const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#ffffff",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #eee",
  },

  logo: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "32px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  navItem: {
    padding: "10px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#555",
    fontSize: "14px",
    transition: "0.2s",
  },

  activeItem: {
    background: "#eef2ff",
    color: "#4f46e5",
    fontWeight: 500,
  },

  logoutWrap: {
    paddingTop: "20px",
  },

  logout: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#888",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
  },
};
