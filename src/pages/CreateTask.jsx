import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { Eraser, Plus, Save } from "lucide-react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const [todos, setTodos] = useState([
    { title: "Enter Todo", description: "Todo Description", id: Math.random() },
  ]);
  const nav = useNavigate();
  function handleTitleChange(id, event) {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos.find((todo) => {
      if (todo.id == id) {
        todo.title = event.target.value;
      }
    });
    setTodos(newTodos);
  }
  function handleDescChange(id, event) {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos.find((todo) => {
      if (todo.id == id) {
        todo.description = event.target.value;
      }
    });
    setTodos(newTodos);
  }
  function addTodo() {
    const emptyTodo = {
      title: "Enter Title",
      description: "Enter Description",
      id: Math.random(),
    };
    setTodos([...todos, emptyTodo]);
  }
  function deleteTodo(id) {
    const todosCopy = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(todosCopy);
  }
  function addTask(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const title = form.get("title");
    const description = form.get("description");
    const body = form.get("body");
    const newTask = { title, description, body, todoList: todos };
    try {
      api.post("/task/", newTask);
      nav("/myTasks");
    } catch (err) {
      console.log(err);
    }
  }
  const formModal = (
    <>
      <h1 className="text-xl font-bold mb-4">New Note</h1>
      <form className=" gap-1 flex flex-col" onSubmit={addTask}>
        <Input name="title" defaultValue={"Title"} required />
        <Input name="description" defaultValue={"Description"} required />
        <Input name="body" defaultValue={"Body"} required />
        <h3>Todos:</h3>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="flex items-center space-x-2">
              <Input
                defaultValue={todo.title}
                onChange={(ev) => handleTitleChange(todo.id, ev)}
                required
              />
              <Input
                defaultValue={todo.description}
                onChange={(ev) => {
                  handleDescChange(todo.id, ev);
                }}
                required
              />

              <Eraser
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              />
            </div>
          );
        })}
        <Plus onClick={addTodo} />
        <Button type="submit">Add Note</Button>
      </form>
    </>
  );
  return <Modal children={formModal} />;
}

export default CreateTask;
