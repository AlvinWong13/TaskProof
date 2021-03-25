const teamMemberReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_MEMBERS':
      return action.payload;
    default:
      return state;
  }
}

export default teamMemberReducer;