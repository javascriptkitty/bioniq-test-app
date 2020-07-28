const express = require("express");
const router = express.Router();
const taskController = require("../controllers");

router.route("/api/tasks").post(taskController.create);

router.route("/api/tasks").get(taskController.findAll);

router.route("/api/tasks/:id").delete(taskController.remove);

module.exports = router;
