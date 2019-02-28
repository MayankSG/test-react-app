import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Login from './components/Login';
import Register from './components/Register';
import Questions from './components/Questions';
import Thankyou from './components/thankyou';

class App extends Component {
  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => window.localStorage.getItem('userId') ?
      <Component {...props}/> : <Redirect to='/'/>}
      />
    );

    return (
      <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute path='/question' component={Questions}/>
          <PrivateRoute exact path='/thankyou' component={Thankyou}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/' component={Login}/>
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;