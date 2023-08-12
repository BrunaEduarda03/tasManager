const mongoose = require("mongoose");
const notAllowedFieldsToUpdateError = require("../errors/general.errors");
const { notFoundError, objectIdError } = require("../errors/mongodb.errors");

const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            if (tasks === [] || tasks.length === 0)
                return notFoundErrorr(
                    this.res,
                    "Error: Data not found in the database"
                );
            return this.res.status(200).send(tasks);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }

    async getTasksById() {
        try {
            const task = await TaskModel.findById(this.req.params.id);
            if (!task)
                notFoundError(
                    this.res,
                    "Error: DataId not found in the database"
                );
            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            return this.res.status(500).send(error.message);
        }
    }

    async createTasks() {
        try {
            const newTasks = await TaskModel.create(this.req.body);
            await newTasks.save();
            return this.res.status(201).send(newTasks);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }

    async updateTasks() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res, "ERROR: missing parameters");
            }

            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = Object.keys(taskData);

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdateError(
                        this.res,
                        "only isCompleted can be updated"
                    );
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdError(this.res);
            }
            return this.res.status(500).send(error.message);
        }
    }

    async deleteTasks() {
        try {
            const task = await TaskModel.findByIdAndDelete(this.req.params.id);
            if (!task) {
                notFoundError(this.res, "Error: No task found ");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
