import { HomeBodyProps } from "../../models/HomeBodyProps";
import HomeSearch from "./HomeSearch";
import HomeTaskList from "./HomeTaskList";

export default function HomeBody({ allTasks }: HomeBodyProps) {
  return (
    <div className="relative flex flex-col space-y-6 bg-slate-50">
      <HomeSearch />
      <HomeTaskList />
    </div>
  );
}
