import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import FormCreateModal from "../FormCreateModal";
import CloseCreateModal from "../CloseCreateModal";

import { CREATE_SUBTASK_MUTATION } from "../../pages/api/crud_subtask";

export default function CreateSubTaskModal({
  onClose,
  taskId,
  allSubTasksRefetch,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [createTask] = useMutation(CREATE_SUBTASK_MUTATION);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="relative flex flex-col space-y-3 bg-white rounded-lg shadow p-8 w-full max-w-md">
        <CloseCreateModal onClose={onClose} />
        <div className="text-lg font-bold">Create a subtask</div>
        <FormCreateModal
          title={title}
          description={description}
          status={status}
          setTitle={setTitle}
          setDescription={setDescription}
          setStatus={setStatus}
          createTask={createTask}
          onClose={onClose}
          taskId={taskId}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      </div>
    </div>
  );
}
