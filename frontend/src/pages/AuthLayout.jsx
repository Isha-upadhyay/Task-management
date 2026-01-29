export default function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1>Task Management</h1>
        <p>Manage your tasks efficiently</p>
      </div>

      <div style={styles.right}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },
  left: {
    flex: 1,
    background: "#6c63ff",
    color: "#fff",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
