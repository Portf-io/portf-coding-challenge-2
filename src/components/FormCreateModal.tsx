import {
  formElementStyling,
  handleFormSubTaskSubmit,
  handleFormSubmit,
} from "../utils/formModalHelper";

export default function FormCreateModal({
  title,
  description,
  status,
  setTitle,
  setDescription,
  setStatus,
  createTask,
  onClose,
  taskId,
  allSubTasksRefetch,
}: FormCreateModalProps) {
  return (
    <form
      className="flex flex-col space-y-6"
      onSubmit={
        taskId
          ? (e) =>
              handleFormSubTaskSubmit(
                e,
                createTask,
                title,
                description,
                status,
                onClose,
                taskId,
                allSubTasksRefetch
              )
          : (e) =>
              handleFormSubmit(
                e,
                createTask,
                title,
                description,
                status,
                onClose
              )
      }
    >
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
  );
}
