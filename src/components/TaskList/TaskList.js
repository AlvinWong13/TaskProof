import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';

function TaskList() {
    const [tasks, setTasks] = useState([])

    const addTask = task => {
      if(!task.text || /^\s*$/.test(task.text)){
        return
      }

      const newTask = [task, ...tasks]

      setTasks(newTask)
      console.log(...tasks);
    }
  return (
    <div className="taskList">
      <h1>What tasks to do today?</h1>
      <TaskForm />
    </div>
  )
}
export default TaskList;