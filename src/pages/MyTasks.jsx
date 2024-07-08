import React, { useEffect, useState } from "react";
import Task from "@/components/Task";
import Spinner from "@/components/ui/Spinner";
import api from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import AreUSureDialog from "@/components/ui/AreUSureDialog";
import { PlusCircle } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function MyTasks() {
  const [pinnedTasks, setPinnedTasks] = useState([]);
  const [notPinnedTasks, setNotPinnedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const nav = useNavigate();
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
  }, [location.pathname]);

  return (
    <>
      <main className="p-4">
        <div className=" flex">
          <h1 className="font-bold mx-2 ">New Note: </h1>{" "}
          <PlusCircle
            className=" cursor-pointer"
            onClick={() => {
              nav("/myTasks/create");
            }}
          />
        </div>

        <Separator className="my-8" />

        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && pinnedTasks.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Pinned Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pinnedTasks.map((task) => (
                <Task getTasks={getTasks} key={task._id} task={task} />
              ))}
            </div>{" "}
            <Separator className="my-8" />
          </>
        )}

        {!loading && notPinnedTasks.length > 0 && (
          <>
            {" "}
            <h2 className="text-xl font-bold mb-4">Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {notPinnedTasks.map((task) => (
                <Task getTasks={getTasks} key={task._id} task={task} />
              ))}
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
}

export default MyTasks;
