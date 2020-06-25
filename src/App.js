import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

const INIT_TODOS = [
  {
    text: 'Learn Reacts',
    isComplete: false,
  },
  {
    text: 'Meet Friends',
    isComplete: false,
  },
  {
    text: 'Build Apps',
    isComplete: false,
  },
]

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || INIT_TODOS);

  useEffect (() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const newTodos = [{text}, ...todos];
    setTodos(newTodos);
  }

  const removeTodo = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />
        {
          todos.map((item, index) => (
            <Todo
              key={item.text}
              todo={item}
              index={index}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
