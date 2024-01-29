import Link from "next/link";
import { GrLinkPrevious } from "react-icons/gr";
import { colorTaskStatusHeader } from "../../utils/colorTaskStatus";

export default function TaskDetailHeader({
  taskTitle,
  taskStatus,
  createdAtDate,
  taskDescription,
}) {
  // Convert createdAtDate to Date object
  const createdAt = new Date(createdAtDate);

  // Format date and time
  const formattedDate = createdAt.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className="relative flex flex-col space-y-10 p-6 w-full bg-slate-500 rounded-lg">
      <div className="flex flex-col space-y-2 text-white">
        <Link
          className="absolute top-2 left-2 flex items-center space-x-1"
          href="/"
        >
          <GrLinkPrevious className="" size={15} />
          <div className="text-xs">Go back</div>
        </Link>

        <div></div>
        <div className="text-7xl">{taskTitle}</div>
        <div className="flex items-center space-x-6">
          <div className={`font-semibold ${colorTaskStatusHeader(taskStatus)}`}>
            {taskStatus}
          </div>
          <div>Created on {formattedDate}</div>
        </div>
      </div>
      <div className="text-white">{taskDescription}</div>
    </div>
  );
}
