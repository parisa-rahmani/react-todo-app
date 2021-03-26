import React from 'react';
import classes from './Toolbar.css';

const Toolbar = () => {
  return (
    <div className={classes.Toolbar}>
      <p>logo</p>
      <a href="/">Sign In</a>
    </div>
  );
};

export default Toolbar;
