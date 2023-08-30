import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { RootState, store } from "./store/index.ts";

const AppWrapper = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  const client = new ApolloClient({ 
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);
