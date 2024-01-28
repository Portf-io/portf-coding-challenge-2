import { useState, useEffect } from "react";

import { HomeBodyProps } from "../../models/HomeProps";
import HomeSearch from "./HomeSearch";
import HomeTaskList from "./HomeTaskList";
import { Task } from "../../models/Task";

export default function HomeBody({ allTasks }: HomeBodyProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(allTasks);
  const [orderByDate, setOrderByDate] = useState<"ascending" | "descending">(
    "ascending"
  );

  useEffect(() => {
    setFilteredTasks(allTasks);
  }, [allTasks]);

  const handleSearchTasks = (query: string) => {
    const queryTasks = allTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(queryTasks);
  };

  const handleOrderByDate = () => {
    const orderedTasks = [...filteredTasks].sort((a, b) => {
      const createdTimeA = new Date(a.createdAt).getTime();
      const createdTimeB = new Date(b.createdAt).getTime();
      return orderByDate === "ascending"
        ? createdTimeA - createdTimeB
        : createdTimeB - createdTimeA;
    });
    console.log(orderedTasks);
    setFilteredTasks(orderedTasks);
    setOrderByDate(orderByDate === "ascending" ? "descending" : "ascending");
  };

  const handleFilterByStatus = (status) => {};

  const handleCreateTask = () => {};

  return (
    <div className="relative flex flex-col space-y-6 ">
      <HomeSearch
        onSearchTasks={handleSearchTasks}
        onOrderByDate={handleOrderByDate}
        onFilterByStatus={handleFilterByStatus}
        onCreateTask={handleCreateTask}
        orderByDate={orderByDate}
      />
      <HomeTaskList filteredTasks={filteredTasks} />
    </div>
  );
}
