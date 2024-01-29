import { SubTaskListProps } from "../../../../models/SubTaskModel";
import SubTaskListItem from "./SubTaskItem";

export default function SubTaskList({
  subTasks,
  allSubTasksRefetch,
}: SubTaskListProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="text-lg">Subtasks</div>
      {subTasks.map((subTask) => (
        <SubTaskListItem
          key={subTask.id}
          subTask={subTask}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      ))}
    </div>
  );
}
