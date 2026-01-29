import { useState, useEffect } from "react";
import api from "../services/api";

export default function CreateTaskModal({ onClose, onCreated }) {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });

  /* 🔹 FETCH USERS FOR DROPDOWN */
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/tasks", form); // 🔥 BACKEND CONNECTED

    onCreated(); // refetch tasks
    onClose();   // close modal
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={styles.title}>Create Task</h3>
          <button onClick={onClose} style={styles.close}>✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Task title</label>
            <input
              name="title"
              placeholder="Enter the task title"
              required
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Briefly describe what needs to be done"
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Assigned User</label>
            <select
              name="assignedTo"
              required
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Assign to</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancel}>
              Cancel
            </button>
            <button type="submit" style={styles.createBtn}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* 🎨 FIGMA STYLE */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "460px",
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
  },
  close: {
    background: "#f3f4f6",
    border: "none",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#374151",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    resize: "none",
    minHeight: "80px",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  cancel: {
    background: "#f3f4f6",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
  },
  createBtn: {
    background: "linear-gradient(180deg,#6366f1,#4f46e5)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 6px 16px rgba(79,70,229,0.3)",
  },
};
