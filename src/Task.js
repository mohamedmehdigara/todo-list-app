import React from 'react';

function Task(props) {
  return (
    <li>
      {props.task}
      <button onClick={() => props.onDeleteTask(props.id)}>Delete</button>
    </li>
  );
}

export default Task;