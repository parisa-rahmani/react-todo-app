import React from 'react';
import classes from './Toolbar.css';
import logo from '../../../assets/logo.png';

const Toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <img src={logo} alt="todo app" />
      <a href="/">Sign In</a>
    </div>
  );
};

export default Toolbar;
