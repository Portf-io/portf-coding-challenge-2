import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_MUTATION, GET_ALL_TASKS } from "../../pages/api/crud_task";
import { FiX } from "react-icons/fi";

const CreateTaskModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [createTask] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_ALL_TASKS }],
  });
  const formElementStyling =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ variables: { title, description, status } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="relative flex flex-col space-y-3 bg-white rounded-lg shadow p-8 w-full max-w-md">
        <div className="absolute top-5 right-5">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiX size={22} className="text-black" />
          </button>
        </div>
        <div className="text-lg font-bold">Create a task</div>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-1 ${formElementStyling}`}
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 ${formElementStyling}`}
              placeholder="Enter task description"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`${formElementStyling}`}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
