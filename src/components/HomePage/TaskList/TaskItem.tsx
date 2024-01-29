import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { SubTask } from "../../../models/SubTaskModel";
import { HomeListItemProps } from "../../../models/props/HomeProps";
import { colorTaskStatus } from "../../../utils/colorTaskStatus";

import {
  GET_ALL_TASKS,
  DELETE_TASK_MUTATION,
  UPDATE_TASK_STATUS,
  GET_SUBTASKS_FOR_TASK,
} from "../../../pages/api/crud_task";

import ChangeStatusDropdown from "../../HelperComponents/StatusDropdown/ChangeStatusDropdown";
import DeleteButton from "../../HelperComponents/DeleteButton";
import ToggleSubTaskButton from "../../HelperComponents/ToggleSubTaskButton";
import ShowSubTasks from "../../HelperComponents/SubTask/ShowSubTasks";
import ShowCreateSubTaskModal from "../../HelperComponents/SubTask/ShowCreateSubTaskModal";

export default function TaskItem({ task }: HomeListItemProps) {
  const router = useRouter();
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [showSubTasks, setShowSubTasks] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allSubTasks, refetch: allSubTasksRefetch } = useQuery(
    GET_SUBTASKS_FOR_TASK,
    { variables: { id: Number(task.id) } }
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

  return (
    <div className="flex flex-col space-y-2">
      <div
        onClick={handleItemClick}
        className={`flex items-center justify-between shadow p-2 rounded-lg cursor-pointer ${colorTaskStatus(
          task
        )}`}
      >
        <ChangeStatusDropdown
          item={task}
          item_type={"task"}
          updateTaskStatus={updateTaskStatus}
        />

        <div className="flex space-x-2">
          <DeleteButton item={task} item_type="task" deleteItem={deleteTask} />
          <ToggleSubTaskButton
            setShowSubTasks={setShowSubTasks}
            showSubTasks={showSubTasks}
          />
        </div>
      </div>
      {showSubTasks && (
        <ShowSubTasks
          subTasks={subTasks}
          allSubTasksRefetch={allSubTasksRefetch}
          handleCreateTask={handleCreateTask}
        />
      )}
      {isModalOpen && (
        <ShowCreateSubTaskModal
          setIsModalOpen={setIsModalOpen}
          task={task}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      )}
    </div>
  );
}
