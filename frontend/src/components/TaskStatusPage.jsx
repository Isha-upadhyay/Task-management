export default function TaskStatusPage({
  task,
  userMap,
  onClose,
  onUpdateStatus,
}) {
  if (!task) return null;

  const formatDate = (createdAt) => {
    if (!createdAt) return "-";
    return new Date(
      createdAt.seconds ? createdAt.seconds * 1000 : createdAt
    ).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={styles.heading}>Task Status</h3>
          <button style={styles.closeIcon} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* STATUS */}
        <div style={styles.statusBox}>
          <div>
            <span style={styles.label}>Status</span>
            <div style={styles.statusText}>{task.status}</div>
          </div>

          <button style={styles.updateStatusBtn} onClick={onUpdateStatus}>
            Update status
          </button>
        </div>

        {/* TITLE */}
        <div style={styles.section}>
          <span style={styles.label}>Task Title</span>
          <p style={styles.value}>{task.title}</p>
        </div>

        {/* ASSIGNED BY + ID */}
        <div style={styles.row}>
          <div>
            <span style={styles.label}>Assigned By</span>
            <p style={styles.value}>
              {userMap?.[task.createdBy] || "—"}
            </p>
          </div>

          <div>
            <span style={styles.label}>Task ID</span>
            <p style={styles.value}>#TSK{task.id?.slice(-3)}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div style={styles.section}>
          <span style={styles.label}>Description</span>
          <p style={styles.desc}>
            {task.description || "No description provided for this task."}
          </p>
        </div>

        <hr style={styles.divider} />

        {/* ACTIVITY */}
        <div>
          <span style={styles.label}>Activity History</span>

          <div style={styles.activityItem}>
            <span style={styles.dot} />
            <div>
              <p style={styles.activityText}>Task created by Admin</p>
              <small style={styles.time}>
                {formatDate(task.createdAt)}
              </small>
            </div>
          </div>

          <div style={styles.activityItem}>
            <span style={styles.dotOutline} />
            <p style={styles.muted}>Task not started</p>
          </div>
        </div>

        {/* USER ACTIONS */}
        <div style={styles.actions}>
          <button style={styles.closeBtn} onClick={onClose}>
            Close
          </button>

          <button
            style={styles.updateTaskBtn}
            onClick={onUpdateStatus}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}



const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.25)",
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  panel: {
    width: "420px",
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: { fontSize: "18px", fontWeight: 600 },

  closeIcon: {
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    cursor: "pointer",
  },

  statusBox: {
    background: "#fff7ed",
    padding: "14px",
    borderRadius: "12px",
    margin: "18px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusText: { color: "#f97316", fontWeight: 600 },

  updateStatusBtn: {
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "6px 12px",
    cursor: "pointer",
  },

  section: { marginBottom: "16px" },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },

  label: {
    fontSize: "12px",
    color: "#9ca3af",
    display: "block",
  },

  value: { fontSize: "14px", fontWeight: 500 },

  desc: { fontSize: "14px", color: "#444" },

  divider: {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "18px 0",
  },

  activityItem: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  dot: {
    width: "10px",
    height: "10px",
    background: "#111",
    borderRadius: "50%",
    marginTop: "6px",
  },

  dotOutline: {
    width: "10px",
    height: "10px",
    border: "2px solid #ccc",
    borderRadius: "50%",
    marginTop: "6px",
  },

  activityText: { fontSize: "14px", fontWeight: 500 },
  time: { fontSize: "12px", color: "#9ca3af" },
  muted: { fontSize: "14px", color: "#9ca3af" },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
  },

  deleteBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  editBtn: {
    background: "linear-gradient(180deg,#6366f1,#4f46e5)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
  },

  closeBtn: {
    background: "#f3f4f6",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
  },

  updateTaskBtn: {
    background: "linear-gradient(180deg,#6366f1,#4f46e5)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
  },
};
