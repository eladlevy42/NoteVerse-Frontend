import React, { useEffect, useState } from "react";
import Task from "@/components/Task";
import Spinner from "@/components/ui/Spinner";
import api from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import AreUSureDialog from "@/components/ui/AreUSureDialog";

function MyTasks() {
  const [pinnedTasks, setPinnedTasks] = useState([]);
  const [notPinnedTasks, setNotPinnedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getTasks() {
    try {
      const { data } = await api.get("/task");
      const { notPinnedTasks, pinnedTasks } = data;
      setPinnedTasks(pinnedTasks || []);
      setNotPinnedTasks(notPinnedTasks || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
      setLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="p-4">
      <h2 className="text-xl font-bold mb-4">Pinned Tasks</h2>
      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && pinnedTasks.length === 0 && (
        <p>No pinned tasks available.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pinnedTasks.map((task) => (
          <Task getTasks={getTasks} key={task._id} task={task} />
        ))}
      </div>
      <Separator className="my-8" />
      <h2 className="text-xl font-bold mb-4">Other Tasks</h2>
      {!loading && notPinnedTasks.length === 0 && (
        <p>No other tasks available.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notPinnedTasks.map((task) => (
          <Task getTasks={getTasks} key={task._id} task={task} />
        ))}
      </div>
    </main>
  );
}

export default MyTasks;
