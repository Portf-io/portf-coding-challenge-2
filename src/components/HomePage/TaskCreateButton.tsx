import { FiPlus } from "react-icons/fi";

export default function TaskCreateButton({ onCreateTask }) {
  return (
    <button
      onClick={onCreateTask}
      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
    >
      <FiPlus className="mr-2" /> Create
    </button>
  );
}
