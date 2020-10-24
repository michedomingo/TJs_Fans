import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './auth/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
