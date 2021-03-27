import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const history = useHistory();
  const [formChange, setFormChange] = useState(true);

  const onRegister = (event) => {
    setFormChange(!formChange);
  };

  return (
    <div className="container">
      <h2 className="welcome">Welcome!</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          A task manager to help keep track of your team tasks and individual.
          Task management is more than just a to-do list. It means delegation of
          tasks to teammates, setting deadlines, and making sure they are done on time. 
          TaskProof empowers teams to keep track and manage themselves and their teams. 
          Don't miss important due dates, tasks big and small. 
          </p>
        </div>
        <div className="grid-col grid-col_4">
          {formChange ? (
            <>
            <LoginForm />
            <center >
            <h4 className ="form-change">Not a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Register
            </button>
          </center>
          </>
          ) : (
            <>
            <RegisterForm />
            <center >
            <h4 className ="form-change">Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onRegister}>
              Login
            </button>
          </center>
          </>
          )}
        </div>
        </div>
      </div>
  );
}

export default LandingPage;
