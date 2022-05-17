import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";

const TaskElement = ({
  taskName,
  date,
  helper_id,
  setTasks,
  tasks,
  createdAt,
}) => {
  const volunteerId = 1;

  const [taskColor, setTaskColor] = useState("");
  const [takenByUser, setTakenByUser] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
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

    isTakenPicker();
    taskColorPicker();
    helperTextPicker();
  }, [createdAt, takenByUser, tasks]);

  const handleHelperUpdate = () => {
    if (helper_id === null) {
      const taskIndex = tasks.findIndex((task) => {
        return task.task_name === taskName;
      });
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex].helper_id = volunteerId;
      setTasks([...updatedTasks]);
    }
  };

  return (
    <div className="task-element-container">
      <div className="task-header">
        <div className="day">{moment(date).format("dddd")}</div>
        <div className="date">{moment(date).format("MMMM D")}</div>
      </div>
      <div className="element-body">
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
          className="button"
          onClick={handleHelperUpdate}
          style={{ backgroundColor: `${taskColor}` }}
        >
          <div className="helper-name">{helperText}</div>
          <div className="will-do-it">
            {helper_id ? "יעשה ע''י" : "תוכל לסייע?"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskElement;
