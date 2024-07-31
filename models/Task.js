// models/Task.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
    priority: { type: String },
    deadline: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Add any custom properties here as needed
    customFields: { type: Map, of: Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
