import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { AuthContext } from '../../context/auth-context';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';

const Auth = props => {
  const [isSignup, setIsSignup] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [authData, setAuthData] = useState({
    token: null,
    userId: null,
    error: null,
    loading: false,
  });

  const authContext = useContext(AuthContext);

  const emailChangeHandler = e => {
    setEmailValue(e.target.value);
  };
  const passwordChangeHandler = e => {
    setPasswordValue(e.target.value);
  };
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const logout = () => {
    setIsSignup(true);
    setAuthData(prevAuthData => {
      return { ...prevAuthData, token: null, userId: null };
    });
    if (
      !authContext.isAuth ||
      localStorage.getItem('expireDate') < new Date().getTime()
    ) {
      authContext.logout();
    }
  };

  const checkAuthState = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      logout();
    } else {
      setAuthData(prevAuthData => {
        return { ...prevAuthData, token: token, userId: userId };
      });
      const expirationDate = new Date(localStorage.getItem('expireDate'));
      authContext.login();
      checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      );
    }
  };

  const checkAuthTimeout = expireTime => {
    setTimeout(() => {
      logout();
    }, expireTime * 1000);
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, []);

  const auth = (email, password, isSignup) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    setAuthData(prevAuthData => {
      return { ...prevAuthData, error: null, loading: true };
    });
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCp_Ir5I8-FeAeo_lhCu2EFNWLAOIVI4iY';

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCp_Ir5I8-FeAeo_lhCu2EFNWLAOIVI4iY';
    }
    axios
      .post(url, authData)
      .then(res => {
        const expireDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expireDate', expireDate);
        localStorage.setItem('userId', res.data.localId);

        setAuthData(prevAuthData => {
          return {
            ...prevAuthData,
            token: res.data.idToken,
            userId: res.data.localId,
            error: null,
            loading: false,
          };
        });
        authContext.isAuth = true;
        checkAuthTimeout(res.data.expireIn);
      })
      .catch(err => {
        setAuthData(prevAuthData => {
          return {
            ...prevAuthData,
            error: err.response.data.error.message,
            loading: false,
          };
        });
        authContext.logout();
      });
  };

  const submitHandler = e => {
    e.preventDefault();
    authContext.login();
    auth(emailValue, passwordValue, isSignup);
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

  if (authData.loading) form = <Spinner />;

  let errorMessage = null;
  if (authData.error)
    errorMessage = <p className={classes.errorMessage}>{authData.error}</p>;

  let authRedirect = null;
  if (authData.token !== null) {
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

export default React.memo(Auth);
