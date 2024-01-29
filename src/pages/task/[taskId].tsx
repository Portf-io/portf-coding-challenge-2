import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_TASK } from "../api/crud_task";

export default function Task() {
  const { query } = useRouter();
  const taskId =
    typeof query["taskId"] === "string" ? query["taskId"] : undefined;

  const { data } = useQuery(GET_TASK, {
    variables: taskId ? { id: Number(taskId) } : undefined,
  });

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Task {data.getTask.id}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Task {data.getTask.id}</h1>
        <h2 className={styles.description}>{data.getTask.title}</h2>
        <p className={styles.description}>{data.getTask.description}</p>
      </main>
    </div>
  );
}
