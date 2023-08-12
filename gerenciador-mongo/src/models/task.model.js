const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
