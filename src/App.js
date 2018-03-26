import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/Home';
import UsersPage from './components/User/Users';
import NewUserPage from './components/User/NewUser';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/users/new" component={NewUserPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
