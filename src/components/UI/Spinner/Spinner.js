import React from 'react';
import classes from './Spinner.css';

const Spinner = () => (
  <div className={classes.lds_ring}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
