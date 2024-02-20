import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import styles from "../styles/Nav.module.css";
import "../styles/globals.css";
import Button from "../components/core/Button";
import { useRouter } from "next/router";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache()
});

function TaskManagerApp({ Component, pageProps }) {
  const { pathname, back } = useRouter();

  return (
    <ApolloProvider client={client}>
      <nav className={styles.nav}>
        <ul>
          {pathname !== "/" && (
            <li>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={back}
              >
                Go back
              </Button>
            </li>
          )}
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default TaskManagerApp;
