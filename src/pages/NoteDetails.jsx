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
  CircleArrowLeft,
  CirclePlus,
  CircleX,
  Eraser,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/use-toast";

function NoteDetails() {
  const { toast } = useToast();
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
      setTodos(data.todoList.sort((a, b) => a.isComplete - b.isComplete));
      setBody(data.body);
      setDescription(data.description);
      setPinned(data.isPinned);
      setTitle(data.title);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.error,
      });
    }
  }

  useEffect(() => {
    const { id } = params;
    getTask(id);
  }, [params]);

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
    await saveChanges();
  }

  async function saveChanges() {
    try {
      const newTask = await api.put("/task", {
        id: task._id,
        title: task.title,
        description: task.description,
        body: task.body,
        todoList: todos,
        isPinned: pinned,
      });
      setIsEditing(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.message,
      });
    }
  }

  async function deleteTask() {
    try {
      await api.delete(`/task/${task._id}`);
      toast({
        variant: "success",
        title: "Note Deleted",
        description: "The note has been deleted successfully.",
      });
      nav("/myTasks");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.error,
      });
    }
  }

  async function addTodo() {
    const emptyTodo = {
      _id: generateObjectId(),
      title: "Enter Title",
    };
    setTodos([...todos, emptyTodo]);
  }

  // i added a function to generate a mongoose like id for the new todos. i know i should do that in the back, but i need the id to add the delete todo option. so i do it in the front.
  function generateObjectId() {
    const timestamp = Math.floor(Date.now() / 1000).toString(16); // 4-byte timestamp

    const randomValue = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 256)
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""); // 5-byte random value

    const counter = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 256)
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""); // 3-byte counter

    return timestamp + randomValue + counter;
  }
  function deleteTodo(id) {
    const todosCopy = todos.filter((todo) => {
      return todo._id !== id;
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
              <CircleArrowLeft
                className="mb-2"
                onClick={() => nav("/myTasks")}
              />
              {isEditing ? (
                <Input
                  placeholder={title}
                  onChange={handleTitleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              ) : (
                <CardTitle>{title}</CardTitle>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Input
              placeholder={body}
              onChange={handleBodyChange}
              className="border border-gray-300 rounded-md p-2"
            />
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
                        placeholder={todo.title}
                        onChange={(event) => handleTodoChange(index, event)}
                        className="border border-gray-300 rounded-md p-2"
                      />
                      <Button
                        variant="outline"
                        className="border-none p-0"
                        onClick={() => {
                          deleteTodo(todo._id);
                        }}
                      >
                        <Eraser className="h-5 w-5" />
                      </Button>
                    </>
                  ) : (
                    <label
                      className={`text-sm ${todo.isComplete ? "line-through" : ""}`}
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
                className="border-none p-0"
                onClick={addTodo}
              >
                <CirclePlus className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center space-x-4">
          <AreUSureDialog
            BtnText={<Trash2 className="h-5 w-5" />}
            func={deleteTask}
          />
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  className="border-none p-0"
                  onClick={() => {
                    saveChanges();
                    toast({
                      variant: "success",
                      title: "Changes Saved",
                      description: "Your changes have been saved successfully.",
                    });
                  }}
                >
                  <Save className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="self-center text-center border-none"
                  onClick={() => {
                    nav("/myTasks");
                  }}
                >
                  Discard <br /> Changes
                </Button>
                <Button
                  variant="outline"
                  className="border-none p-0"
                  onClick={toggleEditMode}
                >
                  <CircleX className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                className=" border-none p-0 m-2 "
                onClick={toggleEditMode}
              >
                <Pencil className="h-5 w-5 " />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );

    return <Modal children={details} onclose={saveChanges} />;
  }

  return null; // Render nothing while loading
}

export default NoteDetails;
