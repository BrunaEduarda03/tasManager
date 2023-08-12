import React, { useEffect, useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setTasks([]);
  };
  return (
    <div className="App">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <button onClick={handleClick}>Limpar Tarefas</button>
    </div>
  );
}

export default App;
