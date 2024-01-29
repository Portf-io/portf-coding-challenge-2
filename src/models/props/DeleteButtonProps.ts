import { SubTask } from "../SubTaskModel";
import { Task } from "../TaskModel";

export interface DeleteButtonProps {
  item: Task | SubTask;
  item_type: string;
  deleteItem;
  allSubTasksRefetch?;
}
