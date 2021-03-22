import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../TaskForm/TaskForm';
import Tasks from '../Tasks/Tasks';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
    width: 450px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0 ,0.2);
    background: #aaa9a9;
    color: #000;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px
  right: 20px;
  width: 32px;
  width: 32px
  height: 32px;
  padding: 0;
  z-index: 10;
`;

function TaskList({showTaskList, setShowTaskList}) {
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
    <>
    {showTaskList ? 
    <Background>
      <ModalWrapper showTaskList={showTaskList}>
        <ModalContent>
      <div className="taskList">
      <h1>What tasks to do today?</h1>
      <TaskForm 
        onSubmit={addTask}
        updateTask={updateTask}
      />
      <Tasks 
        taskList={taskList}
        tasks={tasks} 
        completeTask={completeTask} 
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
        </ModalContent>
        <CloseModalButton
          aria-label='Close modal'
          onClick={() => setShowTaskList(prev => !prev)}
        />
      </ModalWrapper>
    </Background>
    : null}
    </>
  );
};
export default TaskList;