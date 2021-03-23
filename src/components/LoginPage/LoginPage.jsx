import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <div className="welcome">
        <h1>Welcome to TaskProof!</h1>
        <p>We can help you keep track of all your daily, weekly,
          and monthly tasks and make sure they are assigned to the right team members.
          Please Login below or if you are new Register!</p>
      </div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
