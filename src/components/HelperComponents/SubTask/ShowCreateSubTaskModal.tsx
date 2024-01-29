import CreateSubTaskModal from "./CreateSubTaskModal";

export default function ShowCreateSubTaskModal({
  setIsModalOpen,
  task,
  allSubTasksRefetch,
}) {
  return (
    <CreateSubTaskModal
      onClose={() => {
        setIsModalOpen(false);
      }}
      taskId={task.id}
      allSubTasksRefetch={allSubTasksRefetch}
    />
  );
}
