export const handleUpdateTaskStatus = (taskId, newStatus, updateTaskStatus) => {
  updateTaskStatus({ variables: { id: taskId, status: newStatus } });
};
export const handleUpdateSubTaskStatus = async (
  taskId,
  newStatus,
  updateSubTaskStatus,
  allSubTasksRefetch
) => {
  await updateSubTaskStatus({ variables: { id: taskId, status: newStatus } });
  allSubTasksRefetch();
};
