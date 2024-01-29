import { AiOutlineDelete } from "react-icons/ai";
import {
  DELETE_SUBTASK_MUTATION,
  UPDATE_SUBTASK_STATUS,
} from "../../pages/api/crud_subtask";
import { colorTaskStatus } from "../../utils/colorTaskStatus";
import TaskStatusDropdown from "../Task/TaskStatusDropdown";
import { useMutation } from "@apollo/client";
import { GET_SUBTASKS_FOR_TASK } from "../../pages/api/crud_task";

export default function SubTaskListItem({ subTask, allSubTasksRefetch }) {
  const [deleteTask] = useMutation(DELETE_SUBTASK_MUTATION);
  const [updateTaskStatus] = useMutation(UPDATE_SUBTASK_STATUS);

  const handleUpdateStatus = async (taskId, newStatus) => {
    await updateTaskStatus({ variables: { id: taskId, status: newStatus } });
    allSubTasksRefetch();
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask({ variables: { id: subTask.id } });
      allSubTasksRefetch();
    }
  };
  return (
    <div
      className={`flex items-center justify-between ${colorTaskStatus(
        subTask
      )} shadow p-2 rounded-lg`}
    >
      <div className="status-dropdown flex space-x-3 items-center">
        <TaskStatusDropdown
          taskId={subTask.id}
          currentStatus={subTask.status}
          onUpdateStatus={handleUpdateStatus}
        />
        <div className="text-black">{subTask.title}</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}
