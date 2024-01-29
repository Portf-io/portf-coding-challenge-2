import { HomeTaskListProps } from "../../../models/props/HomeProps";
import HomeTaskListItem from "./TaskItem";

export default function TaskList({ filteredTasks }: HomeTaskListProps) {
  return (
    <div className="flex flex-col space-y-2">
      {filteredTasks.map((task) => (
        <HomeTaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
