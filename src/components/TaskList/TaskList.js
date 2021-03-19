import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../TaskForm/TaskForm';
import Tasks from '../Tasks/Tasks';

function TaskList() {
    const dispatch = useDispatch();
    const taskList = useSelector(store => store.taskList)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      dispatch({
        type: 'FETCH_TASKS'
      });
    }, [])

    const addTask = task => {
      if(!task.text || /^\s*$/.test(task.text)){
        return;
      }

      const newTask = [task, ...tasks]

      setTasks(newTask)
    };

    const removeTask = id => {
      const removeArr = [...tasks].filter(task => task.id !== id)
      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });

      setTasks(removeArr)

      dispatch({
        type: 'FETCH_TASKS'
      });
    };

    const updateTask = (taskId, newValue) => {
      if(!newValue.text || /^\s*$/.test(newValue.text)){
        return;
      }

      setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
    }

    const completeTask = id => {
      let updatedTasks = taskList.map(task => {
        if (task.id === id) {
          task.completed = !task.completed
        }
        return task;
      })
      dispatch({
        type: 'MARK_COMPLETED',
        payload: id
      })
      setTasks(updatedTasks);
    }

    // console.log('taskList HERE!', taskList);

  return (
    <div className="taskList">
      <h1>What tasks to do today?</h1>
      <TaskForm 
      onSubmit={addTask}
      updateTask={updateTask}/>
      <Tasks 
        taskList={taskList}
        tasks={tasks} 
        completeTask={completeTask} 
        removeTask={removeTask}
        updateTask={updateTask}/>
    </div>
  )
}
export default TaskList;