import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function TaskForm(props) {
  const dispatch = useDispatch();

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
    dispatch({
      type: 'ADD_TASK',
      payload: {task: input}
    })

    props.onSubmit({
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
          onChange={handleChange}
          ref={inputRef}
          className="task-input edit"
        />
        <button className="task-button"> Update </button> 
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
        <button  className="task-button"> Add Task </button>
      </>
      )}
    </form>
  )
}

export default TaskForm;
