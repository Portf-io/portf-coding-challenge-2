import { gql, useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import Button from "./core/Button";
import styles from "../styles/Dialog.module.css";

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

interface IProps {
  deletingTask: string;
  handleClose: () => void;
}

const ConfirmDialog = ({ deletingTask, handleClose }: IProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [deleteTask, { loading, error, client }] = useMutation(DELETE_TASK, {
    variables: { id: Number(deletingTask) }
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", handleClose);

    return () => {
      dialog?.removeEventListener("close", handleClose);
    };
  }, []);

  useEffect(() => {
    if (deletingTask) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [deletingTask]);

  const confirmDelete = async () => {
    const { data } = await deleteTask();

    client.cache.evict({ id: `Task:${data.deleteTask.id}` });

    handleClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <h2>Are you sure?</h2>
      <p>This task will be deleted forever</p>
      <div className={styles.dialog_actions}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button color="critical" onClick={confirmDelete} disabled={loading}>
          Delete
        </Button>
      </div>
      <p>{error?.message}</p>
    </dialog>
  );
};

export default ConfirmDialog;
