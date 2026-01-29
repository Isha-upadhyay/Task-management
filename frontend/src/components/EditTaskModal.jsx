import { useState } from "react";
import api from "../services/api";
import Modal from "./Modal";

export default function EditTaskModal({ task, users = [], onClose, onSaved }) {
  const [form, setForm] = useState(task);

  const save = async () => {
    await api.put(`/tasks/${task.id}`, form);
    onSaved();
    onClose();
  };

  return (
    <Modal title="Edit Task" onClose={onClose}>
      <div style={styles.form}>

        {/* Task Title */}
        <div style={styles.group}>
          <label style={styles.label}>Task title</label>
          <input
            style={styles.input}
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="Team Building Event"
          />
        </div>

        {/* Description */}
        <div style={styles.group}>
          <label style={styles.label}>Description</label>
          <textarea
            style={styles.textarea}
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Briefly describe what needs to be done"
          />
        </div>

        {/* Assigned User */}
        <div style={styles.group}>
          <label style={styles.label}>Assigned User Dropdown</label>
          <select
            style={styles.select}
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  group: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#444",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    resize: "none",
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  cancelBtn: {
    background: "#f3f3f3",
    border: "none",
    padding: "10px 22px",
    borderRadius: "10px",
    fontWeight: 500,
    cursor: "pointer",
  },

  primaryBtn: {
    background: "#5b5bd6",
    color: "#fff",
    border: "none",
    padding: "10px 26px",
    borderRadius: "10px",
    fontWeight: 500,
    cursor: "pointer",
  },
};
