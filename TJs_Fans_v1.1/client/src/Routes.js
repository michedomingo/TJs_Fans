import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Register from './auth/Register';
import Login from './auth/Login';
import Activate from './auth/Activate';
import Private from './components/Private';
import Admin from './components/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/auth/activate/:token' component={Activate} />
        <PrivateRoute path='/private' component={Private} />
        <AdminRoute path='/admin' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
