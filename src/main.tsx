import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// react router
import { BrowserRouter as Router } from "react-router-dom";
// apollo client
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const token = JSON.parse(localStorage.getItem("user") || "").access_token;

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
