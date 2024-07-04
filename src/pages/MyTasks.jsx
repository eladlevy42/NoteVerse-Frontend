import Task from "@/components/Task";
import React from "react";

function MyTasks() {
  return (
    <main>
      <Task
        props={{
          task: {
            _id: "6685a094444d4ce32b4e400f",
            title: "Washing Machine",
            description:
              "Monthly maintenance and usage tasks for the washing machine.",
            body: "Ensure the washing machine is running smoothly by following these tasks.",
            todoList: [
              {
                title: "Buy detergent",
                isComplete: false,
              },
              {
                title: "Check water supply",
                isComplete: true,
              },
              {
                title: "Clean the drum",
                isComplete: false,
              },
            ],
            isPinned: true,
            user: "66858b32636c648cee105b85",
            __v: 0,
          },
        }}
      />
    </main>
  );
}

export default MyTasks;
