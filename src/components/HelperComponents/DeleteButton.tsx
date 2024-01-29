import { AiOutlineDelete } from "react-icons/ai";
import { DeleteButtonProps } from "../../models/props/DeleteButtonProps";

export default function DeleteButton({
  item,
  item_type,
  deleteItem,
  allSubTasksRefetch,
}: DeleteButtonProps) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteItem({ variables: { id: item.id } });
      if (item_type === "subTask") {
        allSubTasksRefetch();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="delete-button bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
    >
      <AiOutlineDelete />
    </button>
  );
}
