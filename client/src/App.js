import React from "react";
import { client } from "./ApolloProvider";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "sementic-ui-css/sementic.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

export default App;
