import Task from "@/components/Task";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";

function MyTasks() {
  const [tasks, SetTasks] = useState();
  const [tasksGrid, SetTaskGrid] = useState(<div>loading</div>);
  async function getTasks() {
    try {
      const { data } = await api.get("/task");
      SetTasks(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTasks();
    if (tasks) {
      SetTaskGrid(
        tasks.map((task) => {
          return <Task key={task._id} task={task} />;
        })
      );
    } else {
    }
  }, []);

  return (
    <main>
      <div className=" grid grid-cols-3">{tasksGrid}</div>
    </main>
  );
}

export default MyTasks;
