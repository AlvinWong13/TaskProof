const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TASKS':
      // console.log('WHAT IS MY PAYLOAD?', action.payload);
      return action.payload
    default:
      return state;
  }
}

// user will be on the redux state at:
// state.user
export default taskReducer;