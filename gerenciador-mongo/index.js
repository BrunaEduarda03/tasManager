const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const TaskRouter = require("./src/routes/task.routes");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase();

app.use("/tasks", TaskRouter);

app.listen(8000, () => {
    console.log("Server is running on port: 8000");
});
