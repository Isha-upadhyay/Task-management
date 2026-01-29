import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        {/* TOP BAR */}
        <Topbar />

        {/* PAGE TITLE */}
        <h2 className="page-title">Dashboard</h2>

        {/* STATS ROW */}
        <div className="stats-grid">
          <StatCard
            title="Total Tasks"
            count={tasks.length}
            color="linear-gradient(90deg,#6a8cff,#b2c4ff)"
          />
          <StatCard
            title="Pending Tasks"
            count={tasks.filter(t => t.status === "Pending").length}
            color="linear-gradient(90deg,#ffb347,#ffd194)"
          />
          <StatCard
            title="In Progress Tasks"
            count={tasks.filter(t => t.status === "In Progress").length}
            color="linear-gradient(90deg,#b388ff,#e1ccff)"
          />
          <StatCard
            title="Completed Tasks"
            count={tasks.filter(t => t.status === "Completed").length}
            color="linear-gradient(90deg,#6ee7b7,#bbf7d0)"
          />
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions">
          <div className="action-card">
            <h4>All tasks</h4>
            <p>View and manage all posted tasks</p>
          </div>

          <div className="action-card">
            <h4>Create Task</h4>
            <p>Create new task and post</p>
          </div>
        </div>

        {/* EMPTY SPACE LIKE FIGMA */}
        <div style={{ height: "300px" }} />
      </main>
    </div>
  );
}
