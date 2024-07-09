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
import { useToast } from "./ui/use-toast";

function Task({ task, getTasks }) {
  const { toast } = useToast();
  const [pinned, setPinned] = useState(task.isPinned);
  const nav = useNavigate();

  function checkDone() {
    return task.todoList.every((item) => item.isComplete);
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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.error,
      });
    }
  }

  return (
    <Card
      className={`cursor-pointer w-full h-full p-4 ${
        pinned ? "border-2 border-yellow-400" : ""
      } bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] transition-colors duration-300 hover:bg-[hsl(var(--card-hover))]`}
      onClick={() => {
        nav(`/myTasks/${task._id}`);
      }}
    >
      <CardHeader>
        <div className="flex justify-between items-center ">
          <div>
            <label
              htmlFor="pin-checkbox"
              className="cursor-pointer text-sm w-auto"
            >
              {pinned ? (
                <PinOff onClick={handlePinChange} />
              ) : (
                <Pin onClick={handlePinChange} />
              )}
            </label>

            <CardTitle className={checkDone() ? "line-through" : ""}>
              {task.title}
            </CardTitle>

            <CardDescription className={checkDone() ? "line-through" : ""}>
              {task.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className={checkDone() ? "line-through" : ""}>{task.body}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-4"></CardFooter>
    </Card>
  );
}

export default Task;
