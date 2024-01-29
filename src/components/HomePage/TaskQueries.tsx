import { TaskQueriesProps } from "../../models/props/HomeProps";
import TaskSearchBar from "./FilterSortComponents/TaskSearchBar";
import TaskOrderButton from "./FilterSortComponents/TaskOrderButton";
import TaskFilterButton from "./FilterSortComponents/TaskFilterButton";
import TaskCreateButton from "./TaskCreateButton";

export default function TaskQueries({
  onSearchTasks,
  onOrderByDate,
  onFilterByStatus,
  onCreateTask,
  orderByDate,
}: TaskQueriesProps) {
  return (
    <div className="flex justify-around items-center bg-slate-50 shadow py-2 rounded-lg">
      <TaskSearchBar onSearchTasks={onSearchTasks} />
      <div className="flex space-x-3">
        <TaskOrderButton
          onOrderByDate={onOrderByDate}
          orderByDate={orderByDate}
        />
        <TaskFilterButton onFilterByStatus={onFilterByStatus} />
        <TaskCreateButton onCreateTask={onCreateTask} />
      </div>
    </div>
  );
}
