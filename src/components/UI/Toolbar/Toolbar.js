import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.css';
import logo from '../../../assets/logo.png';
import { AuthContext } from '../../../context/auth-context';

const Toolbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes.Toolbar}>
      <img src={logo} alt="todo app" />
      {authContext.isAuth ? (
        <NavLink to="/" exact activeClassName={classes.active}>
          home
        </NavLink>
      ) : null}
      {!authContext.isAuth ? (
        <NavLink to="/auth" activeClassName={classes.active}>
          SignIn
        </NavLink>
      ) : (
        <NavLink to="/logout" activeClassName={classes.active}>
          logout
        </NavLink>
      )}
    </div>
  );
};

export default Toolbar;
