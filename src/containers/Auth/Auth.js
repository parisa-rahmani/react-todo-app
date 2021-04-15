import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

//components
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';

import { Button, TextField } from '@material-ui/core';
import * as style from '../../Mui/MuiStyles';

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

  const submitHandler = e => {
    e.preventDefault();
    props.onAuth(emailValue, passwordValue, isSignup);
  };

  let form = (
    <React.Fragment>
      <form onSubmit={submitHandler} autoComplete="off">
        <TextField
          color="primary"
          label="Email"
          size="medium"
          variant="outlined"
          className={style.authInputClass().root}
          type="email"
          placeholder="Enter Your Email"
          value={emailValue}
          onChange={emailChangeHandler}
        />
        <TextField
          color="primary"
          label="Password"
          size="medium"
          variant="outlined"
          className={style.authInputClass().root}
          type="password"
          placeholder="Enter Your Password"
          value={passwordValue}
          onChange={passwordChangeHandler}
        />
        <Button variant="contained" color="primary" size="small" type="submit">
          submit
        </Button>
      </form>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={switchAuthModeHandler}
      >
        switch to {isSignup ? 'sign in' : 'sign up'}
      </Button>
    </React.Fragment>
  );

  if (props.loading) form = <Spinner />;

  let errorMessage = null;
  if (props.error)
    errorMessage = (
      <p className={classes.errorMessage}>{props.error.message}</p>
    );

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div className={classes.AuthForm}>
      {authRedirect}
      <h3>Sign In / Sign Up</h3>
      {errorMessage}
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Auth));
