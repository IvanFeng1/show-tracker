import React from 'react'
import Startpage from './pages/Startpage.js'
import Browse from './pages/Browse.js'
import Profile from './pages/Profile.js'
import Header from "./pages/components/Header.js"
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom'
function App() {

  return (
    <Router>
      <div className="App" >
        <Header />
        <Switch>
          <Route path="/browse" component={Browse} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Startpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;