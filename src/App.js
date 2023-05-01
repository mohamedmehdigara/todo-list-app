import './App.css';
import AddTask from './AddTask';
import Task from './Task';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <AddTask/>
      <Task/>
      <TodoList/>
    </div>
  );
}

export default App;
