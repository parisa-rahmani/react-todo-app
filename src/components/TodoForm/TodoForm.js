import React, { useState } from 'react';
import classes from './TodoForm.css';
import Spinner from '../UI/Spinner/Spinner';

import { Button, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import * as style from '../../Mui/MuiStyles';

const TodoForm = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();
    props.onAddListItem({
      title: enteredTitle,
      date: new Date().getTime(),
      isComplete: false,
      userId: props.userId,
    });
    setEnteredTitle('');
  };

  const onChange = event => {
    setEnteredTitle(event.target.value);
  };

  let addBtn = (
    <Button
      variant="text"
      size="medium"
      color="primary"
      type="submit"
      disabled={enteredTitle === ''}
      className={style.classAddBtn().root}
    >
      <AddBoxIcon style={{ fontSize: '2.5rem' }} />
    </Button>
  );
  if (props.loading) addBtn = <Spinner />;

  return (
    <div className={classes.TodoForm}>
      <form onSubmit={onSubmitForm}>
        <TextField
          color="primary"
          label="Add ToDo"
          size="medium"
          variant="outlined"
          type="text"
          placeholder="type here"
          value={enteredTitle}
          onChange={onChange}
          className={style.inputStyle().root}
        />
        {addBtn}
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
