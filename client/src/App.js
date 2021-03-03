import React from "react";
import { client } from "./ApolloProvider";
import { ApolloProvider } from "@apollo/client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>asdasd</h1>
    </ApolloProvider>
  );
};

export default App;
