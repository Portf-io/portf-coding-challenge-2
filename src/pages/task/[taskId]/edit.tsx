import Head from "next/head";
import styles from "../../../styles/Form.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_TASKS_QUERY } from "../..";
import { GET_TASK } from ".";
import Button from "../../../components/core/Button";

const EDIT_TASK = gql`
  mutation UpdateTask($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      status
      createdAt
      description
    }
  }
`;

const EditTask = () => {
  const { push, query } = useRouter();
  const id = Number(query.taskId);
  const { data, loading: fetching } = useQuery(GET_TASK, {
    variables: { id }
  });
  const [ediTask, { loading: updating, error, client }] =
    useMutation(EDIT_TASK);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const { data: updatedTask } = await ediTask({
        variables: { id, input: payload }
      });

      client.cache.updateQuery({ query: GET_TASKS_QUERY }, data => {
        if (data) {
          return {
            getTasks: data.getTasks.map(task =>
              task.id === updatedTask.updateTask.id
                ? updatedTask.updateTask
                : task
            )
          };
        }

        return null;
      });

      client.cache.updateQuery(
        { query: GET_TASK },
        () => updatedTask.updateTask
      );

      push(`/task/${updatedTask.updateTask.id}`);
    } catch (error) {
      console.log("Something went wrong!", error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Task Manager App | Update Task</title>
        <meta name="description" content="Manage your tasks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Update task</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error ? <p className="alert">{error?.message}</p> : null}
          <div>
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              defaultValue={data?.getTask.title}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={data?.getTask.description}
            />
          </div>
          <Button disabled={updating}>Save changes</Button>
        </form>
      </main>
    </>
  );
};

export default EditTask;
