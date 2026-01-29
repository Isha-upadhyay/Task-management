import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header style={styles.header}>
      <input placeholder="Search here..." style={styles.search} />
      <span>{user.role.toUpperCase()}</span>
    </header>
  );
}

const styles = {
  header: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
  },
  search: {
    width: "250px",
    padding: "6px",
  },
};
