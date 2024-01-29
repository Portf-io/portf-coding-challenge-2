import { Task } from "../TaskModel";

export interface HomeBodyProps {
  allTasks: Task[];
}

export interface HomeHeaderProps {
  numTasks: number;
  completedTasks: number;
  uncompletedTasks: number;
  pendingTasks: number;
}

export interface HomeTaskListProps {
  filteredTasks: Task[];
}

export interface TaskQueriesProps {
  onSearchTasks: (query: string) => void;
  onOrderByDate: () => void;
  onFilterByStatus: (status: string) => void;
  onCreateTask: () => void;
  orderByDate: "ascending" | "descending";
}

export interface HomeListItemProps {
  task: Task;
}
