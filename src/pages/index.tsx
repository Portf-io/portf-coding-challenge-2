import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "../components/core/Button";

const ConfirmDialog = dynamic(() => import("../components/ConfirmDialog"), {
  ssr: false,
});

export const GET_TASKS_QUERY = gql`
  query GetTasks {
    getTasks {
      id
      title
    }
  }
`;

export default function Home() {
  const { data } = useQuery(GET_TASKS_QUERY);
  const [deletingTask, setDeletingTask] = useState("");

  const triggerDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const taskId = e.currentTarget.dataset.task;

    if (!taskId) {
      throw new Error("`data-task` attribute is missing on delete button");
    }

    setDeletingTask(taskId);
  };
  const handleClose = () => setDeletingTask("");

  return (
    <div className={styles.container}>
      <Head>
        <title>Task Manager App</title>
        <meta name="description" content="Manage your tasks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to the Task Manager</h1>
        <Button href="/task/new" size="medium" className={styles.create_link}>
          Add new task
        </Button>
        <ul className={styles.list}>
          {data?.getTasks.map((task) => (
            <li key={task.id} className={styles.list_item}>
              <Link
                href={`/task/${task.id}`}
                className={styles.list_item__link}
              >
                {task.title}
              </Link>
              <div className={styles.list_item__actions}>
                <Button
                  href={`/task/${task.id}/edit`}
                  size="small"
                  color="secondary"
                  variant="outlined"
                >
                  Edit
                </Button>
                <Button
                  color="critical"
                  data-task={task.id}
                  size="small"
                  onClick={triggerDelete}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <ConfirmDialog deletingTask={deletingTask} handleClose={handleClose} />
    </div>
  );
}
