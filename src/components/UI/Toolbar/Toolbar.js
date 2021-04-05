import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Toolbar.css';
import logo from '../../../assets/logo.png';

const Toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <img src={logo} alt="todo app" />
      <NavLink to="/" exact activeClassName={classes.active}>
        home
      </NavLink>
      <NavLink to="/auth" activeClassName={classes.active}>
        Sign In
      </NavLink>
    </div>
  );
};

export default Toolbar;
