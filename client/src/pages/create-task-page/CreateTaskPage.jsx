import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import "./CreateTaskPage.css";
import heart from "../../assets/heart.png";
import PageLayout from "../../components/PageLayout/PageLayout";
import { Typography } from "@mui/material";
import moment from "moment";
import DatePicker from "../../components/DatePicker/DatePicker";
import MainGreenButton from "../../components/styled/MainGreenButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function CreateTask() {
  const CreateTaskLayout = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(moment());
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const { id } = useParams();

    const handleAddTask = () => {
      taskName &&
        fetch("http://18.197.147.245/api/tasks/create-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            family_id: id,
            task_name: taskName,
            comments: taskDescription,
            date: value,
          }),
        });
      navigate(-1);
    };

    return (
      <div className="container">
        <div className="task-container">
          <div className="tasks-layout">
            <Typography className="task-name" variant="subtitle1">
              {"            שם המשימה"}
            </Typography>
            <input
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              value={taskName}
              className="task-name-input"
              placeholder="הקלד כאן"
            ></input>
            <Typography variant="h4" fontSize="25px">
              {"לביצוע עד..."}
            </Typography>
            <DatePicker value={value} setValue={setValue} />
            <Typography className="task-details" variant="subtitle1">
              {"פרטים"}
            </Typography>
            <textarea
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              rows="2"
              className="task-details-input"
              placeholder="הקלד כאן"
            />
            <div className="buttons-container">
              <MainGreenButton onClick={handleAddTask} className="green-btn">
                {"סיים"}
              </MainGreenButton>
              <div className="trash-icon-div">
                <DeleteForeverOutlinedIcon className="trash-icon" />
                <p className="delete-text">מחק משימה</p>
              </div>
            </div>
          </div>
        </div>
        <div className="img-container">
          <img
            src={heart}
            className="heart-img"
            alt={"hear"}
            loading="lazy"
          ></img>
        </div>
      </div>
    );
  };
  return (
    <PageLayout pageComponent={<CreateTaskLayout />} headerText="יצירת משימה" />
  );
}

export default CreateTask;
