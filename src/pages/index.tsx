import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";

import HomeHeader from "../components/Home/HomeHeader";
import HomeBody from "../components/Home/HomeBody";

import { graphql } from "../gql";
import { Task } from "../models/Task";

const GET_ALL_TASKS = graphql(`
  query GetAllTask {
    getAllTasks {
      id
      title
      description
      status
    }
  }
`);

export default function Home() {
  const { data: allTasks } = useQuery(GET_ALL_TASKS);
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskInfo = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const uncompletedTasks = totalTasks - completedTasks;

    return { totalTasks, completedTasks, uncompletedTasks };
  }, [tasks]);

  useEffect(() => {
    if (allTasks?.getAllTasks) {
      setTasks(allTasks.getAllTasks);
      console.log(tasks);
      console.log(allTasks.getAllTasks);
    }
  }, [allTasks]);

  return (
    <div className="flex flex-col space-y-24">
      <HomeHeader
        numTasks={taskInfo.totalTasks}
        completedTasks={taskInfo.completedTasks}
        uncompletedTasks={taskInfo.uncompletedTasks}
      />
      <HomeBody allTasks={tasks} />
    </div>
  );
}
