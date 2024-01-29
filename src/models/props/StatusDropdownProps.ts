import { SubTask } from "../SubTaskModel";
import { Task } from "../TaskModel";

export interface ChangeStatusDropdown {
  item: Task | SubTask;
  item_type: string;
  updateTaskStatus;
  allSubTasksRefetch?;
}
