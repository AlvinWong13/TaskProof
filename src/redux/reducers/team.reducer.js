const teamReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAMS':
      return action.payload;
    default:
      return state;
  }
}

export default teamReducer;