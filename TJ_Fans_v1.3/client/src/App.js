import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from 'store2';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Form from './pages/Form';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import Product from './pages/Product';
import ListAll from './pages/ListAll';
import List from './pages/List';
import Account from './pages/Account';
import UserMgmt from './pages/admin/UserMgmt';
import ProductMgmt from './pages/admin/ProductMgmt';
import Auth from './pages/Auth';
import { getCurrentUser } from './api/Auth';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemsInList: store.get('itemsInList') || [] };
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
    console.log(this.state);
    return (
      <Router>
        <div className='App'>
          <NavigationBar
            isLoggedIn={isLoggedIn}
            itemsInList={this.state.itemsInList.length}
          />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/auth/:token' exact component={Auth(this.authUser)} />
            <Route path='/forms' exact component={Form} />
            <Route
              path='/list'
              exact
              component={(props) => (
                <List {...props} items={this.state.itemsInList} />
              )}
            />
            <Route path='/list-all' exact component={ListAll} />
            <Route path='/account' exact component={Account} />
            <Route path='/admin/users' exact component={UserMgmt} />
            <Route path='/admin/products' exact component={ProductMgmt} />
            <Route path='/category/:slug' component={Category} />
            <Route path='/product/:id' component={this.ProductPage} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
