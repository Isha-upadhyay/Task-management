import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import TaskTable from "../components/TaskTable";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const { logout } = useAuth();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/tasks/${id}/status`, { status });
    fetchTasks();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        {/* STATS */}
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
          <StatCard title="My Tasks" count={tasks.length} color="blue" />
          <StatCard
            title="Pending"
            count={tasks.filter(t => t.status === "Pending").length}
            color="orange"
          />
          <StatCard
            title="In Progress"
            count={tasks.filter(t => t.status === "In Progress").length}
            color="purple"
          />
          <StatCard
            title="Completed"
            count={tasks.filter(t => t.status === "Completed").length}
            color="green"
          />
        </div>

        {/* TASK TABLE */}
        <div style={{ padding: "20px" }}>
          <TaskTable
            tasks={tasks}
            onStatus={updateStatus}
          />
        </div>

        <button onClick={logout} style={{ margin: "20px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
