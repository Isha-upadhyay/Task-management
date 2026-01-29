import { useState } from "react";
import api from "../services/api";
import Modal from "./Modal";

export default function UpdateStatusModal({ task, onClose, onUpdated,  userMap, }) {
  const [status, setStatus] = useState(task.status);

  const save = async () => {
    await api.patch(`/tasks/${task.id}/status`, { status });
    onUpdated();
    onClose();
  };

  return (
    <Modal title="Task Status" onClose={onClose}>
      <div style={styles.container}>

        {/* Status Banner */}
        <div style={styles.statusPill}>
          <span>Status</span>
          <span>{status}</span>
        </div>

        {/* Task Title */}
        <div>
          <div style={styles.label}>Task Title</div>
          <div style={styles.value}>{task.title}</div>
        </div>

        {/* Assigned + Task ID */}
        <div style={styles.row}>
          <div style={styles.column}>
            <div style={styles.label}>Assigned To</div>
            <div style={styles.value}>{userMap?.[task.assignedTo] || "—"}</div>
          </div>

          <div style={styles.column}>
            <div style={styles.label}>Task ID</div>
            <div style={styles.value}>#{task.taskId}</div>
          </div>
        </div>

        {/* Update Status */}
        <div style={styles.selectGroup}>
          <label style={styles.label}>Update status</label>
          <select
            style={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <span style={styles.helperText}>
            Changing the status will update it for the assigned user.
          </span>
        </div>

        {/* Footer */}
        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.primaryBtn} onClick={save}>
            Save Changes
          </button>
        </div>

      </div>
    </Modal>
  );
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  statusPill: {
    background: "#FFF6E5",
    color: "#F59E0B",
    fontSize: "13px",
    fontWeight: 500,
    padding: "8px 12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: "12px",
    color: "#777",
    fontWeight: 500,
  },

  value: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#111",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },

  column: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },

  selectGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    cursor: "pointer",
  },

  helperText: {
    fontSize: "11px",
    color: "#999",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },

  cancelBtn: {
    background: "#F3F3F3",
    border: "none",
    padding: "10px 24px",
    borderRadius: "10px",
    fontWeight: 500,
    cursor: "pointer",
  },

  primaryBtn: {
    background: "#5B5BD6",
    color: "#fff",
    border: "none",
    padding: "10px 28px",
    borderRadius: "10px",
    fontWeight: 500,
    cursor: "pointer",
  },
};
