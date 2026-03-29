import { useState, useEffect } from "react";
import "./index.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const getTasks = async () => {
    if (!token) {
      return;
    }

    const response = await fetch(
      "https://anythingai-1-r29q.onrender.com/api/v1/tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    if (Array.isArray(data)) {
      setTasks(data);
    } else if (data.tasks) {
      setTasks(data.tasks);
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTask = async () => {
    if (title === "") {
      return;
    }

    await fetch("https://anythingai-1-r29q.onrender.com/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Add Task</button>

      <ul>
        {Array.isArray(tasks) &&
          tasks.map((task) => <li key={task._id}>{task.title}</li>)}
      </ul>
    </div>
  );
};

export default Dashboard;
