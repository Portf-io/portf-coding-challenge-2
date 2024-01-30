import { ChangeStatusDropdown } from "../../../models/props/StatusDropdownProps";
import EnumStatusDropdown from "./EnumStatusDropdown";

export default function ChangeStatusDropdown({
  item,
  item_type,
  updateTaskStatus,
  allSubTasksRefetch,
}: ChangeStatusDropdown) {
  return (
    <div className="flex space-x-3 items-center">
      <EnumStatusDropdown
        itemId={item.id}
        item_type={item_type}
        currentStatus={item.status}
        onUpdateStatus={updateTaskStatus}
        allSubTasksRefetch={allSubTasksRefetch}
      />
      <div className="text-black">{item.title}</div>
    </div>
  );
}
