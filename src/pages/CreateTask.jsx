// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button, Input } from "@/components/ui/button"; // Adjust imports based on your actual component paths

// function CreateTask() {
//   const [todos, setTodos] = useState([]);
//   const [todosElement, setTodosElement] = useState([
//     <Input key={1} placeholder="1. Todo Title" name="todoTitle1" required />,
//   ]);

//   const addTodo = (ev) => {
//     ev.preventDefault();
//     const newCount = todosElement.length + 1;
//     const todoTitle = ev.target.elements["todoTitle"].value;

//     if (!todoTitle.trim()) return;

//     setTodosElement([
//       ...todosElement,
//       <Input
//         key={newCount}
//         placeholder={`${newCount}. Todo Title`}
//         name={`todoTitle${newCount}`}
//         defaultValue={todoTitle}
//         required
//       />,
//     ]);
//     setTodos([...todos, { title: todoTitle, isComplete: false }]);
//     ev.target.elements["todoTitle"].value = "";
//   };

//   const deleteTodo = () => {
//     setTodosElement(todosElement.slice(0, -1));
//     setTodos(todos.slice(0, -1));
//   };

//   const addTask = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const newTask = {
//       title: formData.get("title"),
//       description: formData.getAll("description")[0],
//       body: formData.getAll("description")[1],
//       todoList: todos,
//     };
//     console.log(newTask);
//     // Reset form and todos
//     event.target.reset();
//     setTodos([]);
//     setTodosElement([
//       <Input key={1} placeholder="1. Todo Title" name="todoTitle1" required />,
//     ]);
//   };

//   return (
//     <div>
//       <Card className="w-52 self-center m-auto">
//         <CardHeader>
//           <CardTitle>Create New Task</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={addTask} className="flex-col flex gap-1">
//             <Input placeholder="Task Title" name="title" required />
//             <Input
//               placeholder="Short Description"
//               name="description"
//               required
//             />
//             <Input placeholder="Description" name="body" required />
//             {todosElement}
//             <div className="flex gap-2">
//               <Input placeholder="Todo Title" name="todoTitle" />
//               <Button type="button" onClick={addTodo}>
//                 +
//               </Button>
//               <Button type="button" onClick={deleteTodo}>
//                 -
//               </Button>
//             </div>
//             <Button type="submit">Add Task</Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default CreateTask;
