import React, { Component } from 'react';
import './List.css';
import { saveList } from '../api/Lists';
import ListCreate from '../components/ListCreate';
import ListSubmitForm from '../components/ListSubmitForm';

export default class ListSubmit extends Component {
  state = {
    startedList: false,
    listName: undefined,
    successMessage: undefined,
    errorMessage: undefined,
    loading: false,
  };

  startList = (e) => this.setState({ startedList: true });

  handleChange = (e) => {
    const { name, value } = e.target;
    const [obj, key] = name.split('.');
    const state = Object.assign({}, this.state);
    state[obj][key] = value;
    this.setState(state);
  };

  submitList = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { success, error, data } = await saveList({
      products: this.props.items,
      listName: this.state.listName,
    });
    if (success) {
      this.setState({
        successMessage: `List successfully placed! Your list id is: ${data.getId()}`,
        errorMessage: undefined,
        loading: false,
      });
      this.props.emptyList();
    } else {
      this.setState({
        successMessage: undefined,
        errorMessage: error,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className='List'>
        <h2>My List</h2>
        {this.state.startedList ? (
          <ListSubmitForm
            values={this.state}
            handleChange={this.handleChange}
            submitList={this.submitList}
            successMessage={this.state.successMessage}
            errorMessage={this.state.errorMessage}
            loading={this.state.loading}
          />
        ) : (
          <ListCreate
            items={this.props.items}
            removeFromList={this.props.removeFromList}
            startList={this.startList}
          />
        )}
      </div>
    );
  }
}
