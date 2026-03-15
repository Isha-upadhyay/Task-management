const db = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// CREATE TASK (ADMIN)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res.status(400).json({ message: "Title & assigned user required" });
    }

    const taskId = `TSK${Math.floor(1000 + Math.random() * 9000)}`;

    await db.collection("tasks").add({
      taskId,
      title,
      description: description || "",
      status: "Pending",
      assignedTo,
      assignedBy: req.user.id,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET TASKS (ADMIN = all, USER = assigned)
exports.getTasks = async (req, res) => {
  try {
    let snapshot;

    if (req.user.role === "admin") {
      snapshot = await db.collection("tasks").get();
    } else {
      snapshot = await db
        .collection("tasks")
        .where("assignedTo", "==", req.user.id)
        .get();
    }

    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (ADMIN & USER)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskRef = db.collection("tasks").doc(req.params.id);
    const doc = await taskRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    if (req.user.role !== "admin" && doc.data().assignedTo !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await taskRef.update({ status });
    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// EDIT TASK (ADMIN)
exports.editTask = async (req, res) => {
  try {
    await db.collection("tasks").doc(req.params.id).update(req.body);
    res.json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TASK (ADMIN)
exports.deleteTask = async (req, res) => {
  try {
    await db.collection("tasks").doc(req.params.id).delete();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};