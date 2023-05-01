import React, { Component } from 'react';
import AddTask from './AddTask';

class TodoList extends Component {
  state = {
    tasks: [
      { id: 1, task: 'Buy groceries', completed: false },
      { id: 2, task: 'Go for a walk', completed: true }
    ],
    filter: 'all'
  };

  renderTasks() {
    return this.state.tasks.map(task => (
      <TaskItem key={task.id} id={task.id} task={task.task} completed={task.completed} onToggleCompleted={this.handleToggleCompleted} onDeleteTask={this.handleDeleteTask} />
    ));
  }

  handleAddTask = task => {
    const tasks = [...this.state.tasks];
    tasks.push({ id: tasks.length + 1, task, completed: false });
    this.setState({ tasks });
  };

  handleDeleteTask = id => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    this.setState({ tasks });
  };

  handleToggleCompleted = id => {
    const { tasks } = this.state;
    const index = tasks.findIndex(task => task.id === id);
    const updatedTasks = [
      ...tasks.slice(0, index),
      { ...tasks[index], completed: !tasks[index].completed },
      ...tasks.slice(index + 1)
    ];

    this.setState({ tasks: updatedTasks });
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;

    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const { filter } = this.state;
    const filteredTasks = this.getFilteredTasks();

    return (
      <div>
        <h1>To-Do List</h1>
        <AddTask onAddTask={this.handleAddTask} />
        <div>
          <button onClick={() => this.handleFilterChange('all')} disabled={filter === 'all'}>
            All
          </button>
          <button onClick={() => this.handleFilterChange('completed')} disabled={filter === 'completed'}>
            Completed
          </button>
          <button onClick={() => this.handleFilterChange('incomplete')} disabled={filter === 'incomplete'}>
            Incomplete
          </button>
        </div>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} id={task.id} task={task.task} completed={task.completed} onToggleCompleted={this.handleToggleCompleted} onDeleteTask={this.handleDeleteTask} />
        ))}
      </div>
    );
  }
}

class TaskItem extends Component {
  handleToggleCompleted = () => {
    this.props.onToggleCompleted(this.props.id);
  };

  handleDeleteTask = () => {
    this.props.onDeleteTask(this.props.id);
  };

  render() {
    const { task, completed } = this.props;

    return (
      <div>
        <input type="checkbox" checked={completed} onChange={this.handleToggleCompleted} />
        <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{task}</span>
        <button onClick={this.handleDeleteTask}>Delete</button>
      </div>
    );
  }
}

export default TodoList;

