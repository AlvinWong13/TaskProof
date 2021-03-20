import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskForm from '../TaskForm/TaskForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function Tasks({ taskList, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  // console.log('taskList', taskList);
  const dispatch = useDispatch();

  const submitUpdate = value => {
    updateTask(edit.id, value)
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        editId: edit.id,
        value: value
      }
    });
    console.log('WHAT IS MY EDIT ID', edit.id);
    console.log('WHAT IS MY VALUE?', value);

    setEdit({
      id: null,
      value: ''
    });
    dispatch({
      type: 'FETCH_TASKS',
    });
  }

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return taskList.map((task, index) => (
    <div className={task.completed ? 'task-row complete' : 'task-row'} key={index}>
      <div key={task.id} onClick={() => completeTask(task.id)}>
        {task.task}
      </div>
      <div className="icons">
        <RiCloseCircleLine 
          onClick={() => removeTask(task.id)}
          className='delete-icon'/>
        <TiEdit 
          onClick={() => setEdit({value: task.task, id: task.id })  
          }
          className='edit-icon'/>
      </div>


    </div>
  ))
}

export default Tasks
