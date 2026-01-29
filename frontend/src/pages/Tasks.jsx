import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskTable from "../components/TaskTable";
import CreateTaskModal from "../components/CreateTaskModal";


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);


  const { logout } = useAuth();

  const fetchUsers = async () => {
  const res = await api.get("/users");
  setUsers(res.data);
};


  /* 🔹 FETCH TASKS */
  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {

    fetchTasks();
    fetchUsers();
  }, []);

  /* 🔹 DELETE TASK (ADMIN) */
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const userMap = users.reduce((acc, user) => {
  acc[user.id] = user.name;
  return acc;
}, {});


  /* 🔹 FILTER LOGIC */
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        {/* TITLE */}
        <h2 className="page-title">All Tasks</h2>
        <p className="page-subtitle">
          Manage, assign, and track tasks across your team.
        </p>

        {/* FILTER + CREATE */}
        <div style={styles.toolbar}>
  <div style={styles.tabs}>

            {["All", "Pending", "Completed", "In Progress"].map((item) => (
              <button
  key={item}
  style={{
    ...styles.tab,
    ...(filter === item ? styles.tabActive : {}),
  }}
  onClick={() => setFilter(item)}
>
  {item}
</button>

            ))}
          </div>

<button
  onClick={() => setShowModal(true)}
  style={styles.createTaskBtn}
>
  Create Task
</button>

{showModal && (
  <CreateTaskModal
    onClose={() => setShowModal(false)}
    onCreated={fetchTasks}
  />
)}


        </div>

        {/* TABLE */}
        <div className="card-section">
          <TaskTable
  tasks={filteredTasks}
  isAdmin
  onDelete={deleteTask}
  userMap={userMap}
/>

        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </main>
    </div>
  );
}
const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
  },

  tabs: {
    display: "flex",
    gap: "8px",
    background: "#f9fafb",
    padding: "6px",
    borderRadius: "12px",
  },

  tab: {
    padding: "6px 14px",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: "13px",
    color: "#9ca3af",
    cursor: "pointer",
  },

  tabActive: {
    background: "#eef2ff",
    color: "#4f46e5",
    borderColor: "#6366f1",
    fontWeight: 500,
  },

 createTaskBtn: {
    background: "linear-gradient(180deg, #6366f1, #4f46e5)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(79,70,229,0.25)",
    transition: "0.2s ease",
  },
};
