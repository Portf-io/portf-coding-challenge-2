import {
  handleUpdateSubTaskStatus,
  handleUpdateTaskStatus,
} from "../../../utils/statusDropdownHelper";

export default function EnumStatusDropdown({
  itemId,
  item_type,
  currentStatus,
  onUpdateStatus,
  allSubTasksRefetch,
}) {
  return (
    <select
      value={currentStatus}
      onChange={(e) =>
        item_type === "task"
          ? handleUpdateTaskStatus(itemId, e.target.value, onUpdateStatus)
          : handleUpdateSubTaskStatus(
              itemId,
              e.target.value,
              onUpdateStatus,
              allSubTasksRefetch
            )
      }
      className="px-2 py-1 border rounded-lg focus:outline-none"
    >
      <option value="COMPLETED">Completed</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="PENDING">Pending</option>
    </select>
  );
}
