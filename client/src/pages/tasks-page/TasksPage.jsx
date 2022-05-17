import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import TaskElement from "./components/TaskElement";
import "./TasksPage.css";
import logo from "../../assets/yad-tamar-logo.png";
function TasksPage() {
  const volunteerId = 1;
  const { family_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState("all");
  const [tasks, setTasks] = useState([
    {
      task_name: "לקחת את הדואר",
      task_id: 58,
      family_id: 160,
      helper_id: 2,
      date: "2022-05-16T00:00:00.000Z",
      comments: "",
      createdAt: null,
      updatedAt: null,
    },
    {
      task_name: "task1",
      task_id: 59,
      family_id: 160,
      helper_id: 5,
      date: "2022-05-16T00:00:00.000Z",
      comments: "task1",
      createdAt: true,
      updatedAt: null,
    },
    {
      task_name: "task2",
      task_id: 60,
      family_id: 160,
      helper_id: null,
      date: "2022-05-16T00:00:00.000Z",
      comments: "task2",
      createdAt: null,
      updatedAt: null,
    },
    {
      task_name: "לקנות מזון",
      task_id: 61,
      family_id: 160,
      helper_id: null,
      date: "2022-05-11T00:00:00.000Z",
      comments: "",
      createdAt: null,
      updatedAt: null,
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    if (tasks) {
      switch (filterBy) {
        case "all":
          return setFilteredTasks(tasks);
        case "currentUser":
          const currentUserTasks = tasks.filter((task) => {
            return task.helper_id === volunteerId;
          });
          setFilteredTasks(currentUserTasks);
      }
    }
  }, [filterBy]);

  /* useEffect(() => {
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
  }, []); */

  return loading ? (
    <span>Loading...</span>
  ) : (
    <>
      <div className="header-fill">
        <div className="mobile-header">
          <img className="logo logo-mobile" alt="logo" src={logo}></img>
          <div className="logo-text">
            <Typography variant="h4" lineHeight="1" fontSize="1.5rem">
              {"יד תמר"}
            </Typography>
            <Typography style={{ opacity: "0.5" }} variant="subtitle">
              {"תמיכה במשפחות חולי סרטן ובמצבי משבר"}
            </Typography>
          </div>
        </div>
        <div className="buttons-header">
          <div
            className="button header-button"
            onClick={() => {
              setFilterBy("all");
            }}
          >
            {"רשימה"}
          </div>
          <div
            className="button header-button"
            onClick={() => {
              setFilterBy("currentUser");
            }}
          >
            {"המשימות שלי"}
          </div>
          <div className="button header-button">{"השבוע"}</div>
        </div>
      </div>
      <div className="tasks-container">
        {filteredTasks.map(
          ({ task_name, date, task_id, helper_id, createdAt }) => {
            return (
              <TaskElement
                key={task_id}
                taskName={task_name}
                date={date}
                helper_id={helper_id}
                setTasks={setTasks}
                tasks={tasks}
                createdAt={createdAt}
              />
            );
          }
        )}
      </div>
    </>
  );
}

export default TasksPage;
