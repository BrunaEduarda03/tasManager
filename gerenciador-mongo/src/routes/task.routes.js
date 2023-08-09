const express = require("express");
const TaskController = require("../controllers/task.controller");
const TaskRouter = express.Router();

TaskRouter.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

TaskRouter.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTasksById();
});

TaskRouter.post("/", async (req, res) => {
    return new TaskController(req, res).createTasks();
});

TaskRouter.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTasks();
});

TaskRouter.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTasks();
});
module.exports = TaskRouter;
