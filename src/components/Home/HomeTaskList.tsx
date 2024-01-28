import { HomeTaskListProps } from "../../models/HomeProps";
import HomeTaskListItem from "./HomeTaskListItem";

export default function HomeTaskList({ filteredTasks }: HomeTaskListProps) {
  return (
    <div className="flex flex-col space-y-2">
      {filteredTasks.map((task) => (
        <HomeTaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
