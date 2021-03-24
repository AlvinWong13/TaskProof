import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { RiGhostSmileLine } from 'react-icons/ri';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    '&:before': {
      borderColor: "yellow"
    },
    '&:after': {
      borderColor: "yellow"
    },
  },
  menuItem: {
    backgroundColor: "black"
  },
}));

function Home() {
  const dispatch = useDispatch();
  const teamSelect = useSelector(store => store.teamSelect);
  const [teamId, selectTeamId] = useState('');
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: 'GET_TEAM_SELECT',
    });
  }, []);

  // const selectTeam = () => {
  //   dispatch({
  //     type: 'SELECT_TEAM',
  //     payload: teamId
  //   })
  // };

  // console.log('what is my team?', teamId);
  // console.log ('what is my teamSelect?', teamSelect);

  return (
    <>
    <FormControl className={classes.formControl} > 
      <InputLabel >Select a Team</InputLabel>
      <Select
        name="text"
        id="pickTeam"
        value={teamId}
        onChange={(event) => selectTeamId(event.target.value)}>
          {/* <option value="" disabled>Select a Team:</option> */}
            {teamSelect.map(team => {
              return(
                <MenuItem className={classes.menuItem} key={team.id} value={team.id}>{team.name}</MenuItem>
              )
            })}
      </Select>
    </FormControl> <br />
    <div>
      <Calendar 
        teamId = {teamId}
        generalStyle={{
          maxWidth: "100%",
          margin: "0 auto",
          height: "100%",
          overflow: "auto"
        }}
      />
    </div>
    </>
  )
}

export default Home

