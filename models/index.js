const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: "Title is Required",
  },
  description: {
    type: String,
    required: "Description is Required",
  },
  priority: {
    type: Number,
    required: "Set a priority",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema, "tasks");

module.exports = { Task };
