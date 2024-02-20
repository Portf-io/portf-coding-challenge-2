import Head from "next/head";
import styles from "../../styles/Form.module.css";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_TASKS_QUERY } from "..";
import Button from "../../components/core/Button";

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(input: { title: $title, description: $description }) {
      id
      title
    }
  }
`;

const NewTask = () => {
  const { push } = useRouter();
  const [addTask, { loading, error, client }] = useMutation(CREATE_TASK);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    try {
      const { data: newTask } = await addTask({ variables: payload });

      client.cache.updateQuery({ query: GET_TASKS_QUERY }, data => {
        if (data) {
          return {
            getTasks: [...data.getTasks, newTask.createTask]
          };
        }

        return null;
      });

      push("/");
    } catch (error) {
      console.log("Something went wrong!", error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Task Manager App | Create Task</title>
        <meta name="description" content="Manage your tasks!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Create new task</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error ? <p className="alert">{error?.message}</p> : null}
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={4}></textarea>
          </div>
          <Button disabled={loading}>Create task</Button>
        </form>
      </main>
    </>
  );
};

export default NewTask;
