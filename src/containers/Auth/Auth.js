import axios from 'axios';
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
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const authSignUp = (email, password, isSignup) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp_Ir5I8-FeAeo_lhCu2EFNWLAOIVI4iY';

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp_Ir5I8-FeAeo_lhCu2EFNWLAOIVI4iY';
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  const submitHandler = e => {
    e.preventDefault();
    authSignUp(emailValue, passwordValue, isSignup);
  };

  return (
    <div className={classes.AuthForm}>
      <h3>Sign In / Sign Up</h3>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          placeholder="enter email"
          value={emailValue}
          change={emailChangeHandler}
        />
        <Input
          type="password"
          placeholder="enter password"
          value={passwordValue}
          change={passwordChangeHandler}
        />
        <button>submit</button>
      </form>
      <button onClick={switchAuthModeHandler}>
        switch to {isSignup ? 'sign in' : 'sign up'}
      </button>
    </div>
  );
};

export default Auth;
