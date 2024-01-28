import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";

export default function HomeTaskListItem({ task }) {
  return (
    <Link key={task.id} href={`/task/${task.id}`} passHref>
      <div className="flex items-center justify-between bg-white hover:bg-slate-200 shadow p-2 rounded-lg cursor-pointer">
        <div className="text-black">{task.title}</div>
        <div className="flex space-x-2">
          <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
            <AiOutlineDelete className="" />
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded">
            Dropdown
          </button>
        </div>
      </div>
    </Link>
  );
}
