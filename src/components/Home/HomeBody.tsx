import HomeSearch from "./HomeSearch";
import HomeTaskList from "./HomeTaskList";

export default function HomeBody() {
  return (
    <div className="relative flex flex-col space-y-6 bg-slate-50">
      <HomeSearch />
      <HomeTaskList />
    </div>
  );
}
