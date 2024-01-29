export const colorTaskStatus = (task) =>
  task.status === "COMPLETED"
    ? "bg-green-200 hover:bg-green-100"
    : task.status === "IN_PROGRESS"
    ? "bg-orange-200 hover:bg-orange-100"
    : "bg-white hover:bg-slate-300";

export const colorTaskStatusHeader = (status) =>
  status === "COMPLETED"
    ? "bg-green-400 p-1 rounded-lg"
    : status === "IN_PROGRESS"
    ? "bg-orange-400 p-1 rounded-lg"
    : "bg-slate-400 p-1 rounded-lg";
