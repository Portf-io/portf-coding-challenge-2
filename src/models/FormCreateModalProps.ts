interface FormCreateModalProps {
  title: string;
  description: string;
  status: string;
  setTitle;
  setDescription;
  setStatus;
  createTask: () => void;
  onClose: () => void;
  taskId?: number;
  allSubTasksRefetch?;
}
