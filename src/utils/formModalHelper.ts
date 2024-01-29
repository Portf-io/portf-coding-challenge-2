export const formElementStyling =
  "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

export const handleFormSubmit = async (
  e,
  createTask,
  title: string,
  description: string,
  status,
  onClose
) => {
  e.preventDefault();
  await createTask({ variables: { title, description, status } });
  onClose();
};

export const handleFormSubTaskSubmit = async (
  e,
  createTask,
  title: string,
  description: string,
  status,
  onClose,
  taskId,
  allSubTasksRefetch
) => {
  e.preventDefault();
  await createTask({ variables: { title, description, status, taskId } });
  allSubTasksRefetch();
  onClose();
};
