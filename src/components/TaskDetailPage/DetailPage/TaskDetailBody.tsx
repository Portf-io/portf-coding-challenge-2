import { useState, useEffect } from "react";
import { GET_SUBTASKS_FOR_TASK } from "../../../pages/api/crud_task";
import SubTaskList from "../../HelperComponents/SubTask/SubTaskList/SubTaskList";
import { useQuery } from "@apollo/client";
import { SubTask } from "../../../models/SubTaskModel";
import CreateSubTaskModal from "../../HelperComponents/SubTask/CreateSubTaskModal";

export default function TaskDetailBody({ task }) {
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allSubTasks, refetch: allSubTasksRefetch } = useQuery(
    GET_SUBTASKS_FOR_TASK,
    {
      variables: { id: Number(task.id) },
    }
  );

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (allSubTasks?.getSubTasksForTask) {
      setSubTasks(allSubTasks.getSubTasksForTask);
    }
  }, [allSubTasks]);

  return (
    <div className="relative bg-slate-500 p-6 rounded-lg">
      {isModalOpen && (
        <CreateSubTaskModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          taskId={task.id}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      )}
      {subTasks.length == 0 ? (
        <div className="p-3 rounded-lg">
          <button
            onClick={handleCreateTask}
            className="w-full bg-blue-500 hover:bg-blue-600  text-white shadow transition duration-300 text-lg font-bold p-1 rounded"
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-3 p-3 bg-slate-200 rounded-lg">
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
