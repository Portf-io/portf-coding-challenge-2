import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import FormCreateModal from "../FormCreateModal";
import CloseCreateModal from "../CloseCreateModal";

import { CREATE_TASK_MUTATION, GET_ALL_TASKS } from "../../pages/api/crud_task";

export default function CreateTaskModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="relative flex flex-col space-y-3 bg-white rounded-lg shadow p-8 w-full max-w-md">
        <CloseCreateModal onClose={onClose} />
        <div className="text-lg font-bold">Create a task</div>
        <FormCreateModal
          title={title}
          description={description}
          status={status}
          setTitle={setTitle}
          setDescription={setDescription}
          setStatus={setStatus}
          createTask={createTask}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
