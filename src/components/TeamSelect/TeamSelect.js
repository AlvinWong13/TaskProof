import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function TeamSelect() {
  const teamSelect = useSelector(store => store.teamSelect);
  const [teamId, selectTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'GET_TEAM_SELECT',
    });
  }, []);

  const registerTeam = (event) => {
    event.preventDefault();

    // dispatch({
    //   type: 'SET_TEAM_SELECT',
    // });
  };

  const selectTeam = () => {
    dispatch({
      type: 'SELECT_TEAM',
      payload: teamId
    })
    history.push('/calendar')
  };

  // console.log('what teams am i getting?', teamSelect);
  return(
    <>
    <form className="teamForm" onSubmit={registerTeam}>
      <div> 
        <label htmlFor="teamName">
          Team Name:
          <input
            placeholder="Team Name"
            name="text"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <button>Create</button>
      </div>
      </form>
      <select
        name="text"
        id="pickTeam"
        value={teamId}
        onChange={(event) => selectTeamId(event.target.value)}>
          <option value="" disabled>Select a Team:</option>
            {teamSelect.map(team => {
              return(
                <option key={team.id} value={team.id}>{team.name}</option>
              )
            })}
      </select>
      <button onClick={() => selectTeam()}>Select</button>
    </>
  )
}

export default TeamSelect;