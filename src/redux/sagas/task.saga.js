import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTasks(action) {
  try {
    const tasks = yield axios.get(`/api/tasks/${action.payload.date}/${action.payload.team}`);
    // console.log('what is my data', action.payload.date);
    // console.log('action.payload', action.payload);
    yield put({
      type: 'SET_TASKS',
      payload: tasks.data
    });
  }
  catch (error) {
    console.log('Error retrieving tasks', error);
  }
}

function* addTask(action) {
  try {
    yield axios.post('/api/tasks', action.payload);
    yield put({
      type: 'FETCH_TASKS'
    });
  }
  catch (error) {
    console.log('Error adding task', error);
  }
}

function* deleteTask(action) {
  // console.log('WHAT IS MY DELETE ACTION', action.payload);
  try {
    yield axios.delete(`/api/tasks/${action.payload}`);
  }
  catch (error) {
    console.log('Error Deleting Task');
  }
}

function* updateTask(action) {
  // console.log('WHAT IS MY PAYLOAD WHEN EDITING?', action.payload);
  try {
    yield axios.put(`/api/tasks/${action.payload}`, action.payload)
  }
  catch (error) {
    console.log('Error editing task', error);
  }
}

function* updateCompleted(action) {
  try {
    yield axios.put(`/api/tasks/completed/${action.payload}`);
    yield put({
      type: 'FETCH_TASKS'
    })
  }
  catch (error) {
    console.log('Error updating status', error);
  }
}

function* taskSaga() {
  yield takeLatest('FETCH_TASKS', fetchTasks);
  yield takeLatest('ADD_TASK', addTask);
  yield takeLatest('DELETE_TASK', deleteTask);
  yield takeLatest('EDIT_TASK', updateTask);
  yield takeLatest('MARK_COMPLETED', updateCompleted);
}

export default taskSaga;