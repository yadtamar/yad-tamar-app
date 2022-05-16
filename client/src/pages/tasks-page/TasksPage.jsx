import TaskElement from "./components/TaskElement";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TasksPage.css";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const { family_id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://18.197.147.245/api/tasks/tasks-for-family/${family_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setLoading(false);
        }
      } catch (error) {}
    };
    fetchTasks();
  }, []);

  return loading ? (
    <span>Loading...</span>
  ) : (
    <div className="tasks-container">
      {tasks.map(({ task_name, date, task_id }) => {
        return <TaskElement key={task_id} taskName={task_name} date={date} />;
      })}
    </div>
  );
}

export default TasksPage;
