const editTask = (state = '', action) => {
  switch (action.type) {
      case 'EDIT_TASK':
          return [{ ...state[0], task: action.payload }];
      default:
          return state;
  }
}

export default editTask;