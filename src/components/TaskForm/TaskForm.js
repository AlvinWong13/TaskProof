import React, { useState } from 'react'

function TaskForm() {
  const [input, setInput] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add a Task" 
        value={input}
        name="text" className="task-input"
      />
      <button className="task-button">Add Task </button>
    </form>
  )
}

export default TaskForm
