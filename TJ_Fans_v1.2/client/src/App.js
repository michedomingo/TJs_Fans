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
import UserMgmt from './pages/admin/UserMgmt';
import ProductMgmt from './pages/admin/ProductMgmt';
import Auth from './pages/Auth';
import { getCurrentUser } from './api/Auth';
import Register from './auth/Register';
import Login from './auth/Login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsInList: store.get('itemsInList') || [],
      user: undefined,
    };
    this.ProductPage = Product(this.addToList);
  }

  componentDidMount = () => {
    this.authUser();
    document.addEventListener('visibilitychange', () => {
      console.log('visibilitychange', document.hidden);
      if (!document.hidden) {
        this.setState({
          itemsInList: store.get('itemsInList') || [],
        });
        this.authUser();
      }
    });
  };

  authUser = async () => {
    const result = await getCurrentUser();
    if (result && result.data) {
      this.setState({ user: result.data });
    } else {
      this.setState({ user: undefined });
    }
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
    const isLoggedIn = this.state.user && this.state.user._id;
    return (
      <Router>
        <div className='App'>
          <NavigationBar
            isLoggedIn={isLoggedIn}
            itemsInList={this.state.itemsInList.length}
          />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/auth/:token' exact component={Auth(this.authUser)} />
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

            {isLoggedIn && this.state.user.role === 'admin' && (
              <Route path='/admin/users' exact component={UserMgmt} />
            )}
            {isLoggedIn && this.state.user.role === 'admin' && (
              <Route path='/admin/products' exact component={ProductMgmt} />
            )}

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
