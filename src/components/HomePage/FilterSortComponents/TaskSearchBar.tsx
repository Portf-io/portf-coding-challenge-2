export default function TaskSearchBar({ onSearchTasks }) {
  return (
    <input
      type="text"
      placeholder="Search"
      onChange={(e) => onSearchTasks(e.target.value)}
      className="w-3/5 px-2 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
}
