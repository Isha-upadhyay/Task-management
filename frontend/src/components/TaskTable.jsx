export default function TaskTable({ tasks, isAdmin, onDelete, onStatus, userMap }) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Assigned To</th>
            <th style={styles.th}>Task Title</th>
            <th style={styles.th}>Assigned To</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Created On</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} style={styles.tr}>
              {/* Task ID */}
              <td style={styles.td}>#TSK{t.id?.slice(-3)}</td>

              {/* Title */}
              <td style={styles.td}>{t.title}</td>

              {/* Assigned */}
              <td style={styles.td}>
  {userMap?.[t.assignedTo] || "—"}
</td>


              {/* Status */}
              <td style={styles.td}>
                <span
                  style={{
                    ...styles.status,
                    ...statusStyle[t.status],
                  }}
                >
                  {t.status}
                </span>
              </td>

              {/* Date */}
              <td>
  {t.createdAt
    ? new Date(
        t.createdAt.seconds
          ? t.createdAt.seconds * 1000
          : t.createdAt
      ).toLocaleDateString()
    : "-"}
</td>


              {/* Action */}
              <td style={styles.td}>
                {isAdmin ? (
                  <button style={styles.viewBtn} onClick={() => onDelete(t.id)}>Delete</button>
                ) : (
                  <select
                    value={t.status}
                    onChange={(e) =>
                      onStatus(t.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const styles = {
  wrapper: {
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    border: "1px solid #f1f1f1",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },

  th: {
    textAlign: "left",
    color: "#9ca3af",
    fontWeight: 500,
    padding: "12px 10px",
  },

  td: {
    padding: "14px 10px",
    borderTop: "1px solid #f1f1f1",
  },

  tr: {
    transition: "0.2s",
  },

  status: {
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 500,
    display: "inline-block",
  },

  viewBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    cursor: "pointer",
  },
};

const statusStyle = {
  Pending: {
    background: "#fff7ed",
    color: "#f97316",
  },
  Completed: {
    background: "#ecfdf5",
    color: "#16a34a",
  },
  "In Progress": {
    background: "#eff6ff",
    color: "#2563eb",
  },
};
