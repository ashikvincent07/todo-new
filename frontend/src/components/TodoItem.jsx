import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={todo.status === 'completed'}
        onChange={() => onToggle(todo._id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{
        textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
        flexGrow: 1
      }}>
        {todo.description}
      </span>
      <button onClick={() => onDelete(todo._id)} style={{ marginLeft: '10px' }}>Delete</button>
    </div>
  );
};

export default TodoItem;