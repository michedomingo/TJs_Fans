import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from 'store2';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import FormDemo from './pages/FormDemo';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import Product from './pages/Product';
import ListAll from './pages/ListAll';
import List from './pages/List';
import Landing from './pages/Account';
import Activate from './auth/Activate';
import Register from './auth/Register';
import Login from './auth/Login';
import Private from './pages/admin/Private';
import Admin from './pages/admin/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemsInList: store.get('itemsInList') || [] };
    this.ProductPage = Product(this.addToList);
  }

  componentDidMount = () => {
    document.addEventListener('visibilitychange', () => {
      console.log('visibilitychange', document.hidden);
      if (!document.hidden) {
        this.setState({
          itemsInList: store.get('itemsInList') || [],
        });
      }
    });
  };

  addToList = (item) => {
    const { itemsInList } = this.state;
    itemsInList.push(item);
    this.setState({ itemsInList });
    store.set('itemsInList', itemsInList);
  };

  removeFromList = (index) => {
    const { itemsInList } = this.state;
    itemsInList.splice(index, 1);
    this.setState({ itemsInList });
    store.set('itemsInList', itemsInList);
  };

  render() {
    console.log(this.state);
    return (
      <Router>
        <div className='App'>
          <NavigationBar
            isLoggedIn={true}
            itemsInList={this.state.itemsInList.length}
          />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/auth/activate/:token' component={Activate} />
            <Route path='/forms' exact component={FormDemo} />
            <Route
              path='/list'
              exact
              component={(props) => (
                <List {...props} items={this.state.itemsInList} />
              )}
            />
            <Route path='/list-all' exact component={ListAll} />
            <Route path='/account' exact component={Landing} />
            <Route path='/category/:slug' component={Category} />
            <Route path='/product/:id' component={this.ProductPage} />
            <PrivateRoute path='/private' component={Private} />
            <AdminRoute path='/admin' component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
