import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import Personal from "./components/Personal";
import Search from "./components/Search";
import Repo from "./components/Repo";
import Header from "./components/Header";

export { client };

const link = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    authorization: "Bearer " + localStorage.getItem("token")
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Personal} />
        <Route exact path="/search" component={Search} />
        <Route path="/repo/:name" component={Repo} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
