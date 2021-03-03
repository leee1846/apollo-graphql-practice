import React from "react";
import { client } from "./ApolloProvider";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import "./App.css";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default App;
