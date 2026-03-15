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

    await db.collection("tasks").doc(req.params.id).update({
      status,
    });

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// EDIT TASK (ADMIN)
exports.editTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;
    const updateData = {};
    
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (status) updateData.status = status;

    await db.collection("tasks").doc(req.params.id).update(updateData);
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