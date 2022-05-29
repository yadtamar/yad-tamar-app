import React from "react";
import moment from "moment";
import "../TasksPage.css";
import Task from "./Task";

const TasksList = ({ date, tasks, allTasks, setAllTasks }) => {
  return (
    <div className="task-element-container">
      <div className="task-header">
        <div className="day">{moment(date).format("dddd")}</div>
        <div className="date">{moment(date).format("MMMM D")}</div>
      </div>
      {tasks
        .map((task, index) => {
          return { ...task, id: index };
        })
        .map(({ id, task_name, date, helper_id, createdAt }) => {
          return (
            <Task
              key={id}
              taskName={task_name}
              date={date}
              helper_id={helper_id}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              tasks={tasks}
              createdAt={createdAt}
            />
          );
        })}
    </div>
  );
};

export default TasksList;
