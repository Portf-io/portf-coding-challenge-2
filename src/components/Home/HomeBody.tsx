import HomeSearch from "./HomeSearch";
import HomeTaskList from "./HomeTaskList";

export default function HomeBody({ allTasks }) {
  const taskCount = allTasks ? allTasks.length : 0;
  return (
    <div className="relative flex flex-col space-y-6 bg-slate-50">
      <HomeSearch />
      <HomeTaskList />
      {taskCount}
    </div>
  );
}
