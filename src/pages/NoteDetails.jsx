import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import api from "@/lib/api";
import { Button } from "../components/ui/button";
import AreUSureDialog from "../components/ui/AreUSureDialog";
import { Input } from "../components/ui/input";
import {
  CircleX,
  Eraser,
  Minus,
  Pencil,
  Pin,
  PinOff,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/components/ui/Modal";

function NoteDetails() {
  const params = useParams();
  const [task, setTask] = useState(null);
  const [todos, setTodos] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [body, setBody] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const nav = useNavigate();
  async function getTask(id) {
    try {
      const { data } = await api.get(`/task/${id}`);
      setTask(data);
      setTodos(data.todoList);
      setBody(data.body);
      setDescription(data.description);
      setPinned(data.isPinned);
      setTitle(data.title);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const { id } = params;
    getTask(id);
  }, []);

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

  async function handleCheckedChange(index) {
    const newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
    saveChanges();
  }

  async function saveChanges() {
    try {
      const newTask = await api.put("/task", {
        id: task._id,
        title: task.title,
        description: task.description,
        body: task.body,
        todoList: task.todoList,
        isPinned: pinned,
      });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask() {
    try {
      await api.delete(`/task/${task._id}`);
      nav("/myTasks");
    } catch (err) {
      console.log(err);
    }
  }

  function addTodo() {
    const emptyTodo = {
      title: "Enter Title",
      description: "Enter Description",
    };
    setTodos([...todos, emptyTodo]);
  }

  function deleteTodo(id) {
    const todosCopy = todos.filter((todo) => {
      return todo._id != id;
    });
    setTodos(todosCopy);
  }
  if (task != null) {
    const details = (
      <Card
        className={`w-full h-full p-4 ${pinned ? "border-2 border-yellow-400" : ""}`}
      >
        <CardHeader>
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
            <div className="flex items-center space-x-2"></div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Input value={body} onChange={handleBodyChange} />
          ) : (
            <p>{body}</p>
          )}
          <div className="mt-4 space-y-2">
            {todos.map((todo, index) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    defaultChecked={todo.isComplete}
                    onCheckedChange={() => handleCheckedChange(index)}
                  />
                  {isEditing ? (
                    <>
                      <Input
                        value={todo.title}
                        onChange={(event) => handleTodoChange(index, event)}
                      />
                      <Button
                        variant="outline"
                        className=" border-none"
                        onClick={() => {
                          deleteTodo(todo._id);
                        }}
                      >
                        <Eraser />
                      </Button>
                    </>
                  ) : (
                    <label
                      className={`text-sm ${todo.isComplete ? " line-through" : ""}`}
                    >
                      {index + 1}. {todo.title}
                    </label>
                  )}
                </div>
              );
            })}
            {isEditing ? (
              <Button
                variant="outline"
                className=" border-none"
                onClick={addTodo}
              >
                <Plus />
              </Button>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center space-x-4">
          <AreUSureDialog BtnText={<Trash2 />} func={deleteTask} />
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  className=" border-none p-0 m-2"
                  onClick={saveChanges}
                >
                  <Save />
                </Button>
                <Button
                  variant="outline"
                  className=" border-none p-0 m-2"
                  onClick={toggleEditMode}
                >
                  <CircleX />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className=" border-none p-0 m-2"
                onClick={toggleEditMode}
              >
                <Pencil />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );

    return <Modal children={details} onclose={saveChanges} />;
  }
}

export default NoteDetails;
