import moment from "moment";
import React from "react";

const TaskElement = ({ taskName, date }) => {
  console.log(moment(date));
  return (
    <div className="task-element-container">
      <div className="task-header">
        <div className="day">{moment(date).format("dddd")}</div>
        <div className="date">{moment(date).format("MMMM D")}</div>
      </div>
      <div className="element-body">
        <div className="task">
          <div className="done-until">{moment(date).format("HH:mm")}</div>
          <div className="task-description">{taskName}</div>
        </div>
        <div className="done-by">
          <div className="helper-name">דוד</div>
          <div className="will-do-it">{"יעשה זאת"}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskElement;
