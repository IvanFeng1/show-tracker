import React, { useState, useEffect } from "react";
import Startpage from "./pages/Startpage.js";
import Browse from "./pages/Browse.js";
import Profile from "./pages/Profile.js";
import Apollotest from "./pages/Apollotest.js";
import Header from "./components/Header.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// for apollo client
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

// auth0
import { useAuth0 } from "@auth0/auth0-react";

const httpLink = new HttpLink({
  uri: "https://graphql.anilist.co",
});

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/browse" component={Apollotest} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Startpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
