import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Team() {
  const [teamName, setTeamName] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const registerTeam = (event) => {
    event.preventDefault();

    dispatch({
      type: 'CREATE_TEAM',
      payload: {
        teamName,
      },
    });
    console.log('what is my team name?', teamName);
    history.push('/home');
  };

  return (
    <form className="teamForm" onSubmit={registerTeam}>
      <div> 
        <label htmlFor="teamName">
          Team Name:
          <input
            type="text"
            name="Team Name"
            value={teamName}
            required
            onChange={(event) => setTeamName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Create" />
      </div>
    </form>
  )
}

export default Team;
