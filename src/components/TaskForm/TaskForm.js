import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function TaskForm(props) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const [date, setDate] = useState('')

  const user = useSelector(store => store.user)

  const team = useSelector(store => store.team)

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()

  })

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleDateChange = e => {
    setDate(e.target.value);
  }

  const testButton = e => {
    e.preventDefault();
    console.log('WHAT IS MY DATE?', date)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(!props.edit) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          task: input,
          date: moment(date).format('MM-DD-YYYY'),
          user: user,
        }
      })
    }

    props.onSubmit({
      text: input
    });
    
    setInput('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {props.edit ? ( 
      <>
        <input 
          placeholder="Update your task" 
          value={input}
          name="text" 
          onChange={handleChange}
          ref={inputRef}
          className="task-input edit"
        />
        <button className="task-button"> Update </button> 
      </>
      ) : ( 
      <>
        <input 
          placeholder="Add a Task" 
          value={input}
          name="text" 
          className="task-input"
          onChange={handleChange}
          ref={inputRef}
        />
        <button  className="task-button"> Add Task </button>
      </>
      )}
      <Grid container justify="space-around">
      <TextField
      id="date"
      label="Task Date"
      type="date"
      defaultValue="2021-03-22"
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleDateChange}
      />
      </Grid>
    </form>
  )
}

export default TaskForm;
