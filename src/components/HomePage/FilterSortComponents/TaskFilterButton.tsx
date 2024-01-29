export default function TaskFilterButton({ onFilterByStatus }) {
  return (
    <select
      onChange={(e) => onFilterByStatus(e.target.value)}
      className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
    >
      <option value="">All</option>
      <option value="COMPLETED">Completed</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="PENDING">Pending</option>
    </select>
  );
}
