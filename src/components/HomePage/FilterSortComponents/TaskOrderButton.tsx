import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function TaskOrderButton({ onOrderByDate, orderByDate }) {
  return (
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
  );
}
