import React from "react";
import moment from "moment";
import "../TasksPage.css";
import Task from "./Task";

const TasksList = ({ date, tasks, allTasks, setAllTasks, fetchAllTasks }) => {
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
        .map(
          ({
            id,
            task_name,
            date,
            helper_id,
            createdAt,
            task_id,
            family_id,
            comments,
          }) => {
            return (
              <Task
                key={id}
                task_id={task_id}
                task_name={task_name}
                date={date}
                helper_id={helper_id}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={tasks}
                createdAt={createdAt}
                family_id={family_id}
                fetchAllTasks={fetchAllTasks}
                details={comments}
              />
            );
          }
        )}
    </div>
  );
};

export default TasksList;
