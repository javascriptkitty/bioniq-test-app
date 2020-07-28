const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
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
});

const Task = mongoose.model("Task", TaskSchema, "tasks");

module.exports = { Task };
