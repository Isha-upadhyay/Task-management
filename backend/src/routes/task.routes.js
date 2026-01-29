const express = require("express");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  createTask,
  getTasks,
  updateStatus,
  editTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, role("admin"), createTask);
router.patch("/:id/status", auth, updateStatus);
router.put("/:id", auth, role("admin"), editTask);
router.delete("/:id", auth, role("admin"), deleteTask);

module.exports = router;
