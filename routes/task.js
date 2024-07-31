// routes/taskRoutes.js
const express = require("express");
const Task  = require("../models/Task")
const router = express.Router();
const {
  createTask,
  fetchTasksByStatus,
  updateTaskStatus,
  deleteTask
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



router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, deadline } = req.body;
  console.log("task update request ", id);

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, deadline },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/tasks/:id', deleteTask);


module.exports = router;
