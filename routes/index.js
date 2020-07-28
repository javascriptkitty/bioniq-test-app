const express = require("express");
const router = express.Router();
const taskController = require("../controllers");

router.route("/tasks").post(taskController.create);

router.route("/tasks").get(taskController.findAll);

router.route("/tasks/:id").delete(taskController.remove);

module.exports = router;
