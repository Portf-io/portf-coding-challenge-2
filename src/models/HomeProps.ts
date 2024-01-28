import { Task } from "./Task";

export interface HomeBodyProps {
  allTasks: Task[];
}

export interface HomeHeaderProps {
  numTasks: number;
  completedTasks: number;
  uncompletedTasks: number;
}

export interface HomeTaskListProps {
  filteredTasks: Task[];
}

export interface HomeSearchProps {
  onSearchTasks: (query: string) => void;
  onOrderByDate: () => void;
  onFilterByStatus: (status: string) => void;
  onCreateTask: () => void;
  orderByDate: "ascending" | "descending";
}
