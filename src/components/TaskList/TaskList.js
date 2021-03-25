import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../TaskForm/TaskForm';
import Tasks from '../Tasks/Tasks';
import moment from 'moment';

function TaskList({ date, team }) {
    const dispatch = useDispatch();
    const taskList = useSelector(store => store.taskList)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
      dispatch({
        type: 'FETCH_TASKS',
        payload: {
          date: moment(date).format('YYYY-MM-DD'),
          team: team
        }
      });
    }, [])


    // console.log('what is the date?', date);

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
        payload: {
          id: id,
          date: moment(date).format('YYYY-MM-DD'),
          team: team
        }
      });

      setTasks(removeArr)
      // dispatch({
      //   type: 'FETCH_TASKS',
      //   payload: {
      //     date: moment(date).format('YYYY-MM-DD'),
      //     team: team
      //   }
      // })
    };

    const updateTask = (taskId, newValue) => {
      if(!newValue.text || /^\s*$/.test(newValue.text)){
        return;
      }

      setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
      // dispatch({
      //   type: 'FETCH_TASKS',
      //   payload: {
      //     date: moment(date).format('YYYY-MM-DD'),
      //     team: team
      //   }
      // })
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
    // console.log('what is my team in taskList', team);

  return (
      <div className="taskList">
      <TaskForm
        team = {team}
        onSubmit={addTask}
        updateTask={updateTask}
        date = {date}
      />
      <Tasks
        team = {team}
        date = {date}
        taskList={taskList}
        tasks={tasks} 
        completeTask={completeTask} 
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  );
};
export default TaskList;