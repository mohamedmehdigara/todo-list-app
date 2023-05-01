import React, { Component } from 'react';

class AddTask extends Component {
  state = {
    task: ''
  };

  handleChange = e => {
    this.setState({ task: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddTask(this.state.task);
    this.setState({ task: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.task} onChange={this.handleChange} />
        <button>Add Task</button>
      </form>
    );
  }
}

export default AddTask;