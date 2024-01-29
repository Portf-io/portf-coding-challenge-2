import { FaIndent } from "react-icons/fa";

export default function ToggleSubTaskButton({ setShowSubTasks, showSubTasks }) {
  const toggleSubTasks = () => {
    setShowSubTasks(!showSubTasks);
  };
  return (
    <button
      onClick={toggleSubTasks}
      className="toggle-subtasks bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
    >
      <FaIndent />
    </button>
  );
}
