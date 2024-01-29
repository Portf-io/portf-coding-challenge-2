export interface SubTask {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  taskId: string;
}

export interface SubTaskListProps {
  subTasks: SubTask[];
  allSubTasksRefetch;
}
