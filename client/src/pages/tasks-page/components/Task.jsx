import moment from "moment";
import { useState, useMemo } from "react";

const volunteerId = 1;

const Task = ({
  taskName,
  date,
  helper_id,
  allTasks,
  setAllTasks,
  tasks,
  createdAt,
}) => {
  const [taskColor, setTaskColor] = useState("");
  const [takenByUser, setTakenByUser] = useState(false);
  const [helperText, setHelperText] = useState("");

  const taskColorPicker = () => {
    if (createdAt) {
      setTaskColor("#e0e0e0");
    } else if (helper_id === null) {
      setTaskColor("#9ecf83");
    } else if (helper_id === volunteerId) {
      setTaskColor("#8ca8e0");
    } else if (helper_id) {
      setTaskColor("#fdf797");
    }
  };

  const isTakenPicker = () => {
    if (createdAt) {
      setTakenByUser(true);
    }
  };

  const helperTextPicker = () => {
    if (helper_id === null) {
      setHelperText("פנוי");
    } else if (helper_id === volunteerId) {
      setHelperText("אתה");
    } else if (helper_id) {
      setHelperText(helper_id);
    }
  };

  useMemo(() => {
    isTakenPicker();
    taskColorPicker();
    helperTextPicker();
  }, [createdAt, takenByUser, tasks]);

  const handleHelperUpdate = () => {
    if (helper_id === null) {
      const updatedTasks = [...allTasks];
      const taskIndex = updatedTasks.findIndex(
        ({ task_name }) => task_name === taskName
      );
      updatedTasks[taskIndex].helper_id = volunteerId;
      setAllTasks(updatedTasks);
    }
  };

  return (
    <div className="task-body">
      <div
        className="task"
        style={{
          textDecoration: takenByUser ? "line-through" : null,
          backgroundColor: `${taskColor}`,
          opacity: "0.8",
        }}
      >
        <div className="done-until">{moment(date).format("HH:mm")}</div>
        <div className="task-description">{taskName}</div>
      </div>
      <div
        className="task-button"
        onClick={handleHelperUpdate}
        style={{ backgroundColor: `${taskColor}` }}
      >
        <div className="helper-name">{helperText}</div>
        <div className="will-do-it">
          {helper_id ? "יעשה ע''י" : "תוכל לסייע?"}
        </div>
      </div>
    </div>
  );
};

export default Task;
