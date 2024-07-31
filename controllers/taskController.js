// controllers/taskController.js
const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, status, priority, deadline, customFields } =
    req.body;
  const userId = req.params.userId;

  try {
    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      userId,
      customFields,
    });

    // Save the task to the database
    await newTask.save();
    console.log("new task created ", newTask);

    // Return the saved task as a response
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchTasksByStatus = async (req, res) => {
  const { userId, status } = req.params;

  try {
    // Fetch tasks based on userId and status
    const tasks = await Task.find({ userId, status });
    console.log("found the tasks as ", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const deleteTask = async(req, res) =>{
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createTask, fetchTasksByStatus, updateTaskStatus, deleteTask };
