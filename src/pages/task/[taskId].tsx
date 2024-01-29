import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_TASK } from "../api/crud_task";
import TaskDetailHeader from "../../components/TaskDetailPage/DetailPage/TaskDetailHeader";
import { useState, useEffect } from "react";
import { Task } from "../../models/TaskModel";
import TaskDetailBody from "../../components/TaskDetailPage/DetailPage/TaskDetailBody";

export default function Task() {
  const { query } = useRouter();
  const taskId =
    typeof query["taskId"] === "string" ? query["taskId"] : undefined;
  const { data } = useQuery(GET_TASK, {
    variables: taskId ? { id: Number(taskId) } : undefined,
  });
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (data && data.getTask) {
      setTask(data.getTask);
    }
  }, [data]);

  if (!task) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-10">
      <TaskDetailHeader
        taskTitle={task.title}
        createdAtDate={task.createdAt}
        taskStatus={task.status}
        taskDescription={task.description}
      />
      <TaskDetailBody task={task} />
    </div>
  );
}
