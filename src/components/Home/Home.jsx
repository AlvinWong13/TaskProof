import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../Calendar/Calendar';

function Home() {
  const dispatch = useDispatch();
  const teamSelect = useSelector(store => store.teamSelect);
  const [teamId, selectTeamId] = useState('');

  useEffect(() => {
    dispatch({
      type: 'GET_TEAM_SELECT',
    });
  }, []);

  return (
    <>
    <div className="custom-select" > 
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
    </div> <br />
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

