import React from 'react';
import TextField from '@material-ui/core/TextField';
import useInputState from './useInputState';

const TaskForm = ({ saveTask }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        saveTask(value);
        reset();
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

export default TaskForm;