import { useState, useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";

import HomeHeader from "../components/Home/HomeHeader";
import HomeBody from "../components/Home/HomeBody";

import { Task } from "../models/Task";
import { GET_ALL_TASKS } from "./api/crud_task";

export default function Home() {
  const { data: allTasks } = useQuery(GET_ALL_TASKS);
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskInfo = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    const uncompletedTasks = tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length;
    const pendingTasks = totalTasks - completedTasks - uncompletedTasks;

    return { totalTasks, completedTasks, uncompletedTasks, pendingTasks };
  }, [tasks]);

  useEffect(() => {
    if (allTasks?.getAllTasks) {
      setTasks(allTasks.getAllTasks);
    }
  }, [allTasks]);

  return (
    <div className="flex flex-col space-y-8">
      <HomeHeader
        numTasks={taskInfo.totalTasks}
        completedTasks={taskInfo.completedTasks}
        uncompletedTasks={taskInfo.uncompletedTasks}
        pendingTasks={taskInfo.pendingTasks}
      />
      <div className="text-3xl">Tasks</div>
      <HomeBody allTasks={tasks} />
    </div>
  );
}
