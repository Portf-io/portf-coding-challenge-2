import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { FaIndent } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import {
  GET_ALL_TASKS,
  DELETE_TASK_MUTATION,
  UPDATE_TASK_STATUS,
} from "../../pages/api/crud_task";
import TaskStatusDropdown from "../Task/TaskStatusDropdown";

export default function HomeTaskListItem({ task }) {
  const router = useRouter();
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  const handleItemClick = (e) => {
    if (
      !e.target.closest(".delete-button") &&
      !e.target.closest(".status-dropdown") &&
      !e.target.closest(".toggle-subtasks")
    ) {
      router.push(`/task/${task.id}`);
    }
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    updateTaskStatus({ variables: { id: taskId, status: newStatus } });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask({ variables: { id: task.id } });
    }
  };

  const colorTaskStatus =
    task.status === "COMPLETED"
      ? "bg-green-200 hover:bg-green-100"
      : task.status === "IN_PROGRESS"
      ? "bg-orange-200 hover:bg-orange-100"
      : "bg-white hover:bg-slate-200";

  return (
    <div
      onClick={handleItemClick}
      className={`flex items-center justify-between ${colorTaskStatus} shadow p-2 rounded-lg cursor-pointer`}
    >
      <div className="status-dropdown flex space-x-3 items-center">
        <TaskStatusDropdown
          taskId={task.id}
          currentStatus={task.status}
          onUpdateStatus={handleUpdateStatus}
        />
        <div className="text-black">{task.title}</div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
        >
          <AiOutlineDelete />
        </button>
        <button className="toggle-subtasks bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
          <FaIndent />
        </button>
      </div>
    </div>
  );
}
