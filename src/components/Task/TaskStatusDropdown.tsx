import React from "react";

export default function TaskStatusDropdown({
  taskId,
  currentStatus,
  onUpdateStatus,
}) {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onUpdateStatus(taskId, e.target.value)}
      className="px-2 py-1 border rounded-lg focus:outline-none"
    >
      <option value="COMPLETED">Completed</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="PENDING">Pending</option>
    </select>
  );
}
