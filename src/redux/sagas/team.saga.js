import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* selectTeam(action) {
  try {
    const response = yield axios.get(`/api/team/myTeams`)
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
  console.log('postNewTeam', action.payload);
  try {
    yield axios.post('/api/team', action.payload);
    yield put({
      type: 'ADD_TEAM_MEMBER'
    })
  }
  catch (error) {
    console.log('Error posting new team', error)
  }
}

function* addTeamMember(action) {
  console.log('what is my action?', action.payload);
  try {
    yield axios.post('/api/team/add', action.payload);
    yield put({
      type: 'SET_TEAMS'
    })
  }
  catch (error) {
    console.log('Error adding team member to team', error)
  }
}

function* teamMembers(action) {
  try {
    const teamMember = yield axios.get(`/api/team/members/${action.payload}`)
    yield put({
      type: 'SET_TEAM_MEMBERS',
      payload: teamMember.data
    })
  }
  catch (error) {
    console.log('Error getting all team members', error)
  }
}

function* teamSaga() {
  yield takeEvery('GET_TEAM_SELECT', selectTeam);
  yield takeEvery('CREATE_TEAM', postNewTeam);
  yield takeEvery('GET_TEAM_MEMBERS', teamMembers);
  yield takeEvery('ADD_TEAM_MEMBER', addTeamMember)
}

export default teamSaga;