import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Login from './components/Login';
import Register from './components/Register';
import Questions from './components/Questions';

class App extends Component {
  render() {

    return (
      <div>
      <Router history={history}>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/' component={Login}/>
          <Route exact path='/question' component={Questions}/>
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;