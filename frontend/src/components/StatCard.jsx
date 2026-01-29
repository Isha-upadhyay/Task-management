export default function StatCard({ title, count, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${color}` }}>
      <h4>{title}</h4>
      <h2>{count}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "15px",
    width: "200px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
};
