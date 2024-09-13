// Todo.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, removeTodos, completeTodos } from '../redux/reducer';

const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const todoList = useSelector((state) => state.todos); // Select todos from Redux state
  const dispatch = useDispatch();
    
  const addTodo = (e) => {
    e.preventDefault();
    const trimmedTodo = todoText.trim();
    if (trimmedTodo === "") {
      alert("Please Enter a Value");
    } else if (todoList.some((todo) => todo.item === trimmedTodo)) {
      alert(`"${trimmedTodo}" Already Exists in the List`);
    } else {
      const newTodo = {
        id: Date.now(),
        item: trimmedTodo,
        completed: false,
      };
      dispatch(addTodos(newTodo)); // Dispatch action to add todo
      setTodoText(''); 
    }
  };

  const deleteTodo = (id) => {
    dispatch(removeTodos(id)); // Dispatch action to remove todo
  };

  const toggleDone = (id) => {
    dispatch(completeTodos(id)); // Dispatch action to mark as completed
  };

  return (
    <div id="formDiv">
      <h1>ToDo List!</h1>
      <form id="addTodoForm" onSubmit={addTodo}>
        <input
          type="text"
          name="entry"
          id="todoText"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add your new ToDo..."
        />
        <button type="submit" id="todoAdd">+</button>
      </form>

      <ul id="todoUl">
        {todoList.map((todo, index) => (
          <li key={todo.id} id={`todo-${index}`}>
            {todo.item}
            <button className="delete-botton" onClick={() => deleteTodo(todo.id)}>
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button className="done-botton" onClick={() => toggleDone(todo.id)}>
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
