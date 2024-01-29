import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { FaIndent } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_TASKS,
  DELETE_TASK_MUTATION,
  UPDATE_TASK_STATUS,
  GET_SUBTASKS_FOR_TASK,
} from "../../pages/api/crud_task";
import TaskStatusDropdown from "../Task/TaskStatusDropdown";
import { useEffect, useState } from "react";
import { SubTask } from "../../models/SubTaskModel";
import { HomeListItemProps } from "../../models/HomeProps";
import SubTaskList from "../SubTask/SubTaskList";
import CreateSubTaskModal from "../SubTask/CreateSubTaskModal";
import { colorTaskStatus } from "../../utils/colorTaskStatus";

export default function HomeTaskListItem({ task }: HomeListItemProps) {
  const router = useRouter();
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [showSubTasks, setShowSubTasks] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allSubTasks, refetch: allSubTasksRefetch } = useQuery(
    GET_SUBTASKS_FOR_TASK,
    {
      variables: { id: Number(task.id) },
    }
  );
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  useEffect(() => {
    if (allSubTasks?.getSubTasksForTask) {
      setSubTasks(allSubTasks.getSubTasksForTask);
    }
  }, [allSubTasks]);

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

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

  const toggleSubTasks = () => {
    setShowSubTasks(!showSubTasks);
  };

  return (
    <div className="flex flex-col space-y-2">
      {isModalOpen && (
        <CreateSubTaskModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          taskId={task.id}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      )}
      <div
        onClick={handleItemClick}
        className={`flex items-center justify-between ${colorTaskStatus(
          task
        )} shadow p-2 rounded-lg cursor-pointer`}
      >
        <div className="flex space-x-3 items-center">
          <div className="status-dropdown">
            <TaskStatusDropdown
              taskId={task.id}
              currentStatus={task.status}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
          <div className="text-black text-lg font-semibold">{task.title}</div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleDelete}
            className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
          >
            <AiOutlineDelete />
          </button>
          <button
            onClick={toggleSubTasks}
            className="toggle-subtasks bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
          >
            <FaIndent />
          </button>
        </div>
      </div>
      {showSubTasks && (
        <div className="flex flex-col space-y-3 ml-24 p-3 bg-slate-200 rounded-lg">
          <SubTaskList
            subTasks={subTasks}
            allSubTasksRefetch={allSubTasksRefetch}
          />
          <button
            onClick={handleCreateTask}
            className="w-full bg-blue-500 hover:bg-blue-600  text-white shadow transition duration-300 text-lg font-bold p-1 rounded"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
