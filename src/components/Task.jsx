import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function Task({ task }) {
  const formatTodos = task.todoList.map((todoObj, index) => {
    function handleChecked() {}
    return (
      <div key={index}>
        <input
          type="checkbox"
          onChange={handleChecked}
          checked={todoObj.isComplete}
        />
        <label>
          {index + 1}. {todoObj.title}
        </label>
      </div>
    );
  });
  return (
    <Card className=" w-52 self-center m-auto">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {task.body}
        {formatTodos}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default Task;
