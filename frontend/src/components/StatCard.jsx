export default function StatCard({ title, count, color }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.bar, background: color }} />
      <p style={styles.title}>{title}</p>
      <h2 style={styles.count}>{count}</h2>
    </div>

    
  );
}

const styles = {
    
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    position: "relative",
    overflow: "hidden",
  },
  bar: {
    height: "40px",
    width: "100%",
    borderRadius: "6px",
    marginBottom: "10px",
    opacity: 0.9,
  },
  title: {
    fontSize: "12px",
    color: "#777",
  },
  count: {
    fontSize: "22px",
    fontWeight: 600,
  },
};



