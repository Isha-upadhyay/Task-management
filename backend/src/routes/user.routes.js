const express = require("express");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const { getUsers } = require("../controllers/user.controller");

const router = express.Router();

// ADMIN → get all users
router.get("/", auth, role("admin"), getUsers);

module.exports = router;
