import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.css';
import logo from '../../../assets/logo.png';

const Toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <img src={logo} alt="todo app" />
      {props.isAuth ? (
        <NavLink to="/" exact activeClassName={classes.active}>
          home
        </NavLink>
      ) : null}
      {!props.isAuth ? (
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
