import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.includes("dashboard");
  const isTasks = location.pathname.includes("tasks");

  const isAdmin = user?.role === "admin";

  return (
    <aside style={styles.sidebar}>
      {/* TOP */}
      <div>
        {/* LOGO */}
        <h2 style={styles.logo}>Task Management</h2>

        {/* NAV */}
        <nav style={styles.nav}>
          {/* DASHBOARD — BOTH USER & ADMIN */}
          <NavItem
            label="Dashboard"
            active={isDashboard}
            to={`/${user.role}/dashboard`}
          />

          {/* TASKS — ADMIN ONLY */}
          {isAdmin && (
            <NavItem
              label="Tasks"
              active={isTasks}
              to={`/${user.role}/tasks`}
            />
          )}
        </nav>
      </div>

      {/* LOGOUT — BOTH */}
      <div style={styles.logoutWrap} onClick={logout}>
        <div style={styles.logoutRow}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>

          <span style={styles.logoutText}>Logout</span>
        </div>
      </div>
    </aside>
  );
}

/* 🔹 NAV ITEM */
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

/* 🎨 STYLES (UNCHANGED FIGMA STYLE) */
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
    flexShrink: 0,
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
    paddingTop: "24px",
    cursor: "pointer",
  },

  logoutRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#9CA3AF",
    fontSize: "14px",
  },

  logoutText: {
    fontSize: "14px",
    color: "#9CA3AF",
  },
};
