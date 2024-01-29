import SubTaskList from "./SubTaskList/SubTaskList";

export default function ShowSubTasks({
  subTasks,
  allSubTasksRefetch,
  handleCreateTask,
}) {
  return (
    <div className="flex flex-col space-y-3 ml-24 p-3 bg-slate-200 rounded-lg">
      <SubTaskList
        subTasks={subTasks}
        allSubTasksRefetch={allSubTasksRefetch}
      />
      <button
        onClick={handleCreateTask}
        className="w-full bg-blue-500 hover:bg-blue-600  text-white shadow transition duration-300 text-lg font-bold p-1 rounded"
      >
        +
      </button>
    </div>
  );
}
