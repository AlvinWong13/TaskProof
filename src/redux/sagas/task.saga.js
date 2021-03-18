import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchTasks() {
  try {
    const tasks = yield axios.get('/api/tasks');
    yield put({
      type: 'SET_TASKS',
      payload: tasks.data
    });
  }
  catch (error) {
    console.log('Error retrieving tasks', error);
  }
}

function* taskSaga() {
  yield takeEvery('FETCH_TASKS', fetchTasks);
}

export default taskSaga;