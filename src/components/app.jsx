import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from '../store/store';
import Login from './auth/login';
import SignUp from './auth/signup';
import Home from './container/home';
import './app.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="appContainer">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/portal" component={Home} />
          <Route component={() => <h1>NOT FOUND</h1>} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
