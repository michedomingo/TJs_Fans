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
import Account from './pages/Account';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemsInList: store.get('itemsInList') || [] };
    this.ProductPage = Product(this.addToList);
  }

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
            <Route path='/forms' exact component={FormDemo} />
            <Route path='/list' exact component={List} />
            <Route path='/list-all' exact component={ListAll} />
            <Route path='/account' exact component={Account} />
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
