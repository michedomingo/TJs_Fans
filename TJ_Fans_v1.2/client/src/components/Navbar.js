import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

export default class NavigationBar extends Component {
  render() {
    const { isLoggedIn, itemsInList } = this.props;

    return (
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            <i className='fas fa-fan'></i> TJ's Fans
          </Link>
        </h1>

        <Link to='/category/cheese'>cheese</Link>
        <Link to='/category/frozen'>frozen</Link>
        <Link to='/category/grocery'>grocery</Link>
        <Link to='/category/produce'>produce</Link>
        <Link to='/category/snacks'>snacks</Link>

        {isLoggedIn ? (
          <Fragment>
            <Link to='/list'>my list ({itemsInList})</Link>
            <Link to='/list-all'>all lists</Link>
          </Fragment>
        ) : (
          <Link to='/account'>account</Link>
        )}
      </nav>
    );
  }
}
