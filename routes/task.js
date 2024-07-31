// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  createTask,
  fetchTasksByStatus,
  updateTaskStatus,
} = require("../controllers/taskController");
const { verifyToken } = require("../middleware/auth");

// Route for creating a task
router.post("/createtask/user/:userId", verifyToken, createTask);
router.get(
  "/tasks/user/:userId/status/:status",
  verifyToken,
  fetchTasksByStatus
);

router.patch("/tasks/:taskId", verifyToken, updateTaskStatus); // New route for updating status


module.exports = router;
