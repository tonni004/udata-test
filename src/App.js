import { useState, useCallback, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './output.css';
import './styles/main.scss';

const LOCAL_STORAGE_KEY = 'Todos';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const saveTodosToLocalStorage = useCallback((todosToSave) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosToSave));
  }, []);

  const addTodo = useCallback((newTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [newTodo, ...prevTodos];
      saveTodosToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveTodosToLocalStorage]);

  const deleteTodo = useCallback((todoId) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
      saveTodosToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveTodosToLocalStorage]);

  const toggleTodoCompletion = useCallback((todoId) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodosToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }, [saveTodosToLocalStorage]);

  useEffect(() => {
    if (todos.length > 0) {
      saveTodosToLocalStorage(todos);
    }
  }, [todos, saveTodosToLocalStorage]);

  return (
    <div className="App">
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleCompletion={toggleTodoCompletion} />
    </div>
  );
}
