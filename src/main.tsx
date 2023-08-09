import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// react router
import { BrowserRouter as Router } from "react-router-dom";
// apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

const token = localStorage.getItem("token"); // Retrieve token from local storage

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api",
  headers: {
    authorization: token ? `Bearer ${token}` : "", // Include the token in the headers
  },
});

const client = new ApolloClient({
  link: httpLink, // Use the http link with headers
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
