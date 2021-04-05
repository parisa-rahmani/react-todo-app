import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.css';

const Auth = props => {
  const [isSignup, setIsSignup] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const emailChangeHandler = e => {
    setEmailValue(e.target.value);
  };

  const passwordChangeHandler = e => {
    setPasswordValue(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
  };
  return (
    <div className={classes.AuthForm}>
      <h3>Sign In / Sign Up</h3>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          placeholder="enter email"
          value={emailValue}
          onChange={emailChangeHandler}
        />
        <Input
          type="password"
          placeholder="enter password"
          value={passwordValue}
          onChange={passwordChangeHandler}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Auth;
