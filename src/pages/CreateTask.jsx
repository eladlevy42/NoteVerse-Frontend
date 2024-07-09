import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/lib/api";
import { Eraser, Plus, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTask() {
  const { toast } = useToast();
  const [todos, setTodos] = useState([
    { title: "Enter Todo", description: "Todo Description", id: Math.random() },
  ]);
  const nav = useNavigate();

  function handleTitleChange(id, event) {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos.find((todo) => {
      if (todo.id === id) {
        todo.title = event.target.value;
      }
    });
    setTodos(newTodos);
  }

  function handleDescChange(id, event) {
    event.preventDefault();
    const newTodos = [...todos];
    newTodos.find((todo) => {
      if (todo.id === id) {
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
      return todo.id !== id;
    });
    setTodos(todosCopy);
  }

  async function addTask(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const title = form.get("title");
    const description = form.get("description");
    const body = form.get("body");
    const newTask = { title, description, body, todoList: todos };

    try {
      await api.post("/task/", newTask);
      toast({
        variant: "success",
        title: "Task Created",
        description: "Your task has been created successfully.",
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

  const formModal = (
    <>
      <h1 className="text-xl font-bold mb-4 text-[hsl(var(--foreground))]">
        New Note
      </h1>
      <form className="gap-1 flex flex-col" onSubmit={addTask}>
        <Input name="title" placeholder={"Title"} required />
        <Input name="description" placeholder={"Description"} required />
        <Input name="body" placeholder={"Body"} required />
        <h3 className="text-[hsl(var(--foreground))]">Todos:</h3>
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="flex items-center space-x-2">
              <Input
                placeholder={todo.title}
                onChange={(ev) => handleTitleChange(todo.id, ev)}
                required
              />
              <Input
                placeholder={todo.description}
                onChange={(ev) => handleDescChange(todo.id, ev)}
                required
              />
              <Eraser
                onClick={() => deleteTodo(todo.id)}
                className="w-14 cursor-pointer text-[hsl(var(--foreground))]"
              />
            </div>
          );
        })}
        <PlusCircle
          onClick={addTodo}
          className=" my-2 cursor-pointer text-[hsl(var(--foreground))]"
        />
        <Button
          type="submit"
          className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
        >
          Add Note
        </Button>
      </form>
    </>
  );

  return <Modal children={formModal} />;
}

export default CreateTask;
