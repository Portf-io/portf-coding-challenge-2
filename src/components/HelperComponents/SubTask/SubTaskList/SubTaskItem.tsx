import { useMutation } from "@apollo/client";
import { SubTaskListItemProps } from "../../../../models/SubTaskModel";

import { colorTaskStatus } from "../../../../utils/colorTaskStatus";
import ChangeStatusDropdown from "../../StatusDropdown/ChangeStatusDropdown";
import DeleteButton from "../../DeleteButton";

import {
  DELETE_SUBTASK_MUTATION,
  UPDATE_SUBTASK_STATUS,
} from "../../../../pages/api/crud_subtask";

export default function SubTaskListItem({
  subTask,
  allSubTasksRefetch,
}: SubTaskListItemProps) {
  const [deleteTask] = useMutation(DELETE_SUBTASK_MUTATION);
  const [updateTaskStatus] = useMutation(UPDATE_SUBTASK_STATUS);

  return (
    <div
      className={`flex items-center justify-between ${colorTaskStatus(
        subTask
      )} shadow p-2 rounded-lg`}
    >
      <ChangeStatusDropdown
        item={subTask}
        item_type={"subTask"}
        updateTaskStatus={updateTaskStatus}
        allSubTasksRefetch={allSubTasksRefetch}
      />

      <div className="flex space-x-2">
        <DeleteButton
          item={subTask}
          item_type={"subTask"}
          deleteItem={deleteTask}
          allSubTasksRefetch={allSubTasksRefetch}
        />
      </div>
    </div>
  );
}
