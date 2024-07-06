import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/lib/api";
import { Button } from "./ui/button";
import AreUSureDialog from "./ui/AreUSureDialog";
import { Input } from "./ui/input";
import Spinner from "./ui/Spinner";

function Task({ task, getTasks }) {
  const [todos, setTodos] = useState(task.todoList);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [body, setBody] = useState(task.body);
  const [pinned, setPinned] = useState(task.isPinned);
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleBodyChange(event) {
    setBody(event.target.value);
  }

  function handleTodoChange(index, event) {
    const newTodos = [...todos];
    newTodos[index].title = event.target.value;
    setTodos(newTodos);
  }

  function handleCheckedChange(index) {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  }

  async function saveChanges() {
    try {
      const newTask = await api.put("/task", {
        id: task._id,
        title,
        description,
        body,
        todoList: todos,
        isPinned: pinned,
      });
      setIsEditing(false);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask() {
    try {
      await api.delete(`/task/${task._id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card
      className={`w-full h-full p-4 ${pinned ? "border-2 border-yellow-400" : ""}`}
    >
      <CardHeader>
        {pinned && <span>📌</span>}
        <div className="flex justify-between items-center">
          <div>
            {isEditing ? (
              <Input value={title} onChange={handleTitleChange} />
            ) : (
              <CardTitle>{title}</CardTitle>
            )}
            {isEditing ? (
              <Input value={description} onChange={handleDescriptionChange} />
            ) : (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Input value={body} onChange={handleBodyChange} />
        ) : (
          <p>{body}</p>
        )}
        <div className="mt-4 space-y-2">
          {todos.map((todo, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={todo.isComplete}
                onCheckedChange={() => handleCheckedChange(index)}
              />
              {isEditing ? (
                <Input
                  value={todo.title}
                  onChange={(event) => handleTodoChange(index, event)}
                />
              ) : (
                <label className="text-sm">
                  {index + 1}. {todo.title}
                </label>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <AreUSureDialog BtnText={"Delete"} func={deleteTask} />
        {isEditing ? (
          <>
            <Button variant="outline" onClick={saveChanges}>
              Save
            </Button>
            <Button variant="outline" onClick={toggleEditMode}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={toggleEditMode}>
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default Task;
