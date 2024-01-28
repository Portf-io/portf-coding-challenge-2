import { FiPlus, FiArrowDown, FiArrowUp } from "react-icons/fi";
import { HomeSearchProps } from "../../models/HomeProps";

export default function HomeSearch({
  onSearchTasks,
  onOrderByDate,
  onFilterByStatus,
  onCreateTask,
  orderByDate,
}: HomeSearchProps) {
  return (
    <div className="flex justify-around items-center bg-slate-50 shadow py-2 rounded-lg">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearchTasks(e.target.value)}
        className="w-3/5 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <div className="flex space-x-3">
        <button
          onClick={() => onOrderByDate()}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <div className="flex items-center">
            {orderByDate === "ascending" ? (
              <FiArrowUp className="mr-2" />
            ) : (
              <FiArrowDown className="mr-2" />
            )}
            Order by date
          </div>
        </button>
        <select
          onChange={(e) => onFilterByStatus(e.target.value)}
          className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="PENDING">Pending</option>
        </select>
        <button
          onClick={onCreateTask}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
        >
          <FiPlus className="mr-2" /> Create
        </button>
      </div>
    </div>
  );
}
