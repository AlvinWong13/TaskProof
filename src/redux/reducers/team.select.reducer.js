const teamSelectReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_SELECT':
      return action.payload;
    default:
      return state;
  }
}

export default teamSelectReducer;