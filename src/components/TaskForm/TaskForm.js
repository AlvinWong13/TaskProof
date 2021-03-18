import React, { useState, useEffect, useRef } from 'react'

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {props.edit ? ( 
      <>
        <input 
          placeholder="Update your task" 
          value={input}
          name="text" 
          className="task-input"
          onChange={handleChange}
          ref={inputRef}
          className="task-input edit"
        />
        <button className="task-button">Update </button> 
      </>
      ) : ( 
      <>
        <input 
          placeholder="Add a Task" 
          value={input}
          name="text" 
          className="task-input"
          onChange={handleChange}
          ref={inputRef}
        />
        <button className="task-button">Add Task </button>
      </>
      )}

      
    </form>
  )
}

export default TaskForm
