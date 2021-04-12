import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

//components
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

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

  useEffect(() => {
    let mount = true;
    if (mount) {
      // checkAuthState();
      // auth(emailValue, passwordValue, isSignup);
    }
    return () => {
      // clearTimeout();
      mount = false;
    };
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    // authContext.login();
    props.onAuth(emailValue, passwordValue, isSignup);
  };

  let form = (
    <React.Fragment>
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
