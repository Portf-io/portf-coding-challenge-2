import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (allTasks?.getAllTasks) {
      setTasks(allTasks.getAllTasks);
    }
  }, [allTasks]);

  return (
    <div className="flex flex-col space-y-24">
      <HomeHeader allTasks={tasks} />
      <HomeBody allTasks={tasks} />
    </div>
  );
}
