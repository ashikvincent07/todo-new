import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    onAdd(description);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Add a task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;