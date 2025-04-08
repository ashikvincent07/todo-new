import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (description) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/todos`, { description, status: 'ongoing' });
      setTodos([...todos, res.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleStatus = async (id) => {
    const todo = todos.find(todo => todo._id === id);
    const newStatus = todo.status === 'completed' ? 'ongoing' : 'completed';
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/todos/${id}`, { status: newStatus });
      setTodos(
        todos.map(t =>
          t._id === id ? { ...t, status: newStatus } : t
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Todo Dashboard</h1>
      <TodoForm onAdd={addTodo} />
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo} onToggle={toggleStatus} />
      ))}
    </div>
  );
};

export default Dashboard;