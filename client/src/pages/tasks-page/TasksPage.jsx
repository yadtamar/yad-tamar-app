import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Spinner from "../../components/Spinner/Spinner";
import moment from "moment";
import logo from "../../assets/yad-tamar-logo.png";
import TasksList from "./components/TasksList";
import "./TasksPage.css";
import { CircularProgressWithLabel } from "../tasks-page/components/CircularProgress";

const volunteerId = 1;

function Tasks() {
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState("all");
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(allTasks);
  const [sortedTasks, setSortedTask] = useState([]);
  const [completedPrecent, setCompletedPrecent] = useState();
  const { family_id } = useParams();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const tasksResponse = await fetch(
        `http://18.197.147.245/api/tasks/tasks-for-family/${family_id}`
      );
      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setAllTasks(tasksData);
      }
    } catch (error) {
      throw new Error("something went wrong while fetching tasks");
    }
  };

  var newArr = [];
  const splitTasks = (tasks) => {
    if (!tasks[0]) {
      return newArr;
    } else {
      const currentDate = moment(parseInt(tasks[0].date)).format();
      const filteredTasks = tasks.filter((task) =>
        moment(moment(parseInt(task.date)).format()).isSame(currentDate, "day")
      );
      newArr.unshift({ date: currentDate, tasks: filteredTasks });
      const newTasks = tasks.filter(
        (task) =>
          !moment(moment(parseInt(task.date)).format()).isSame(
            currentDate,
            "day"
          )
      );
      splitTasks(newTasks);
    }
  };

  const calculateCompleted = () => {
    const completedTasks = allTasks.filter(
      (task) => task.createdAt === true
    ).length;
    setCompletedPrecent((completedTasks / allTasks.length) * 100);
  };

  useEffect(() => {
    calculateCompleted();
    setSortedTask(newArr);
    splitTasks(filteredTasks);
    setLoading(false);
  }, [allTasks, filterBy, filteredTasks]);

  useEffect(() => {
    if (allTasks) {
      switch (filterBy) {
        case "all":
          return setFilteredTasks(allTasks);
        case "currentUser":
          const currentUserTasks = allTasks.filter(
            (task) => task.helper_id === volunteerId
          );
          return setFilteredTasks(currentUserTasks);
        case "thisWeek":
          const thisWeekTasks = allTasks.filter((task) =>
            moment(task.date).isSame(moment(), "week")
          );
          return setFilteredTasks(thisWeekTasks);
      }
    }
  }, [filterBy, allTasks]);

  return completedPrecent === "NaN" || NaN ? (
    <Spinner />
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
            className="task-button header-button"
            onClick={() => {
              setFilterBy("all");
            }}
          >
            {"רשימה"}
          </div>
          <div
            className="task-button header-button"
            onClick={() => {
              setFilterBy("currentUser");
            }}
          >
            {"המשימות שלי"}
          </div>
          <div
            className="task-button header-button"
            onClick={() => {
              setFilterBy("thisWeek");
            }}
          >
            {"השבוע"}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="spinner-box">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="completed-precentage-box">
            <CircularProgressWithLabel value={Math.round(completedPrecent)} />
            <div>
              <Typography
                marginRight="60px"
                alignSelf="center"
                variant="subtitle1"
                color="#8CA8E0"
              >
                {"משימות הושלמו"}
              </Typography>
            </div>
          </div>
          <div className="tasks-container">
            {sortedTasks
              .map((dateObj, index) => {
                return { ...dateObj, id: index };
              })
              .map(({ date, tasks, id }) => {
                return (
                  <TasksList
                    key={id}
                    date={date}
                    tasks={tasks}
                    allTasks={allTasks}
                    setAllTasks={setAllTasks}
                    fetchAllTasks={fetchAllTasks}
                  ></TasksList>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}

export default Tasks;
