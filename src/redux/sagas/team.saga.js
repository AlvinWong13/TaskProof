import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* selectTeam(action) {
  try {
    // console.log('SELECT TEAM');
    const response = yield axios.get(`/api/team/all`)
    yield put({
      type: 'SET_TEAM_SELECT',
      payload: response.data
    })
  }
  catch (error) {
    console.log('Error getting teams', error)
  }
}

function* postNewTeam(action) {
  try {
    yield axios.post('/api/team', action.payload);
    yield put({
      type: 'SET_TEAM'
    })
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* teamSaga() {
  yield takeEvery('GET_TEAM_SELECT', selectTeam);
  yield takeEvery('CREATE_TEAM', postNewTeam)
}

export default teamSaga;