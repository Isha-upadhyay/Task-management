import api from "../services/api";

export default function DeleteTaskModal({ task, onClose, onDeleted }) {
  const del = async () => {
    await api.delete(`/tasks/${task.id}`);
    onDeleted();
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* TITLE */}
        <h3 style={styles.title}>Delete this task?</h3>

        {/* SUBTEXT */}
        <p style={styles.desc}>
          This action cannot be undone. The task will be permanently removed.
        </p>

        {/* ACTIONS */}
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.deleteBtn} onClick={del}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 FIGMA-STYLE EXACT */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },

  modal: {
    width: "480px",
    background: "#fff",
    borderRadius: "16px",
    padding: "28px 24px 24px",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  closeBtn: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "none",
    background: "#f3f4f6",
    cursor: "pointer",
    fontSize: "14px",
  },

  title: {
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center",
    marginBottom: "8px",
  },

  desc: {
    fontSize: "14px",
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: "1.5",
    marginBottom: "22px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
  },

  cancelBtn: {
    flex: 1,
    background: "#f3f4f6",
    border: "none",
    padding: "12px 0",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 0",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 6px 14px rgba(239,68,68,0.35)",
  },
};
