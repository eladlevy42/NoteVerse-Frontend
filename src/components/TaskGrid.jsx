import React from "react";
import Task from "./Task";

function TaskGrid({ props }) {
  const tasks = props.tasks;
  tasksElements = tasks.map((task) => {
    <Task task={task} key={task._id} />;
  });
  return <div className=" grid grid-cols-3">{tasksElements}</div>;
}

export default TaskGrid;
