import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import api from "@/lib/api";

import AreUSureDialog from "./ui/AreUSureDialog";

import { Pin, PinOff, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Task({ task, getTasks }) {
  const [todos, setTodos] = useState(task.todoList);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [body, setBody] = useState(task.body);
  const [pinned, setPinned] = useState(task.isPinned);
  const nav = useNavigate();
  function checkDone() {
    for (let i of task.todoList) {
      if (!i.isComplete) return false;
    }
    return true;
  }
  async function handlePinChange(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    try {
      const newTask = await api.put("/task", {
        id: task._id,
        title: task.title,
        description: task.description,
        body: task.body,
        todoList: task.todoList,
        isPinned: !pinned,
      });
      setPinned(!pinned);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card
      className={`w-full h-full p-4 ${pinned ? "border-2 border-yellow-400" : ""}  `}
      onClick={() => {
        nav(`/myTasks/${task._id}`);
      }}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <label
              htmlFor="pin-checkbox"
              className="text-sm"
              onClick={handlePinChange}
            >
              {pinned ? <PinOff /> : <Pin />}
            </label>

            <CardTitle className={`${checkDone() ? ` line-through` : ``}`}>
              {title}
            </CardTitle>

            <CardDescription
              className={`${checkDone() ? ` line-through` : ``}`}
            >
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={`${checkDone() ? ` line-through` : ``}`}> {body}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-4"></CardFooter>
    </Card>
  );
}

export default Task;
