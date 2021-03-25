import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchTasks(action) {
  // console.log('what is my payload?', action.payload);
  try {
    const tasks = yield axios.get(`/api/tasks/${action.payload.date}/${action.payload.team}`);
    // console.log('what is my date', action.payload.date);
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
  // console.log('what is my action?', action.payload);
  try {
    yield axios.post('/api/tasks', action.payload);
    yield put({
      type: 'FETCH_TASKS',
      payload: {
        date: action.payload.date, 
        team: action.payload.team
      }
    })
  }
  catch (error) {
    console.log('Error adding task', error);
  }
}

function* deleteTask(action) {
  // console.log('WHAT IS MY DELETE ACTION', action.payload);
  try {
    yield axios.delete(`/api/tasks/${action.payload.id}`);
    yield put({
      type: 'FETCH_TASKS',
      payload: {
        date: action.payload.date, 
        team: action.payload.team
      }
    })
  }
  catch (error) {
    console.log('Error Deleting Task');
  }
}

function* updateTask(action) {
  // console.log('WHAT IS MY PAYLOAD WHEN EDITING?', action.payload);
  try {
    yield axios.put(`/api/tasks/${action.payload}`, action.payload)
    yield put({
      type: 'FETCH_TASKS',
      payload: {
        date: action.payload.date, 
        team: action.payload.team
      }
    })
  }
  catch (error) {
    console.log('Error editing task', error);
  }
}

function* updateCompleted(action) {
  try {
    yield axios.put(`/api/tasks/completed/${action.payload}`);
    yield put({
      type: 'FETCH_TASKS',
    })
  }
  catch (error) {
    console.log('Error updating status', error);
  }
}

function* taskSaga() {
  yield takeEvery('FETCH_TASKS', fetchTasks);
  yield takeEvery('ADD_TASK', addTask);
  yield takeEvery('DELETE_TASK', deleteTask);
  yield takeEvery('EDIT_TASK', updateTask);
  yield takeEvery('MARK_COMPLETED', updateCompleted);
}

export default taskSaga;