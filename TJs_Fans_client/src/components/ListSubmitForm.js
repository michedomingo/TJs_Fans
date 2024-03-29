import React, { Component } from 'react';
import Form from './Form';
import TextInput from './inputs/TextInput';
import { PrimaryButton } from './Button';
import LoadingIndicator from './LoadingIndicator';

class ListSubmitForm extends Component {
  render() {
    if (this.props.successMessage) {
      return (
        <div>
          <h3 style={{ color: 'mediumaquamarine' }}>Success! 🎉</h3>
          <p>{this.props.successMessage}</p>
        </div>
      );
    }
    return (
      <Form onSubmit={this.props.submitList}>
        <TextInput
          label='List Title'
          name='listName.title'
          value={this.props.values.listName.title || ''}
          onChange={this.props.handleChange}
        />
        <TextInput
          label='Notes'
          name='listName.notes'
          value={this.props.values.listName.notes || ''}
          onChange={this.props.handleChange}
        />
        <PrimaryButton disabled={this.props.loading}>Save List</PrimaryButton>
        {this.props.loading && <LoadingIndicator />}
        {this.props.errorMessage && (
          <p style={{ color: 'crimson' }}>{this.props.errorMessage}</p>
        )}
      </Form>
    );
  }
}

export default ListSubmitForm;
