import { FiX } from "react-icons/fi";

export default function CloseCreateModal({ onClose }) {
  return (
    <div className="absolute top-5 right-5">
      <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
        <FiX size={22} className="text-black" />
      </button>
    </div>
  );
}
