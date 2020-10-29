import React, { Component } from 'react';
import { getLists } from '../api/Lists';
import LoadingIndicator from '../components/LoadingIndicator';
import ListHistory from '../components/ListHistory';

export default class ListAll extends Component {
  state = { lists: [], loading: true };

  componentDidMount = async () => {
    const { success, data, error } = (await getLists()) || [];
    this.setState({ lists: data || [], loading: false });
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }
    return this.state.lists.map((list) => (
      <ListHistory key={list.getListName()} list={list} />
    ));
  }
}
