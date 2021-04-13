import React, { useState } from 'react';
import classes from './TodoForm.css';
// import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';

import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';

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

  const classbtn = makeStyles({
    root: {
      minWidth: '2rem',
      padding: 0,
    },
  })();
  const inputStyle = makeStyles({
    root: {
      width: '60%',
      '& .MuiInputBase-input': {
        color: 'blue',
      },
      '& label': {
        color: 'cadetblue',
      },
      '& label.Mui-focused': {
        color: 'blue',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'blue',
          borderWidth: '1.5px',
        },
        '&:hover fieldset': {
          borderColor: 'blue',
        },
      },
    },
  })();

  let addBtn = (
    <Button
      variant="text"
      size="medium"
      color="primary"
      type="submit"
      disabled={enteredTitle === ''}
      className={classbtn.root}
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
          className={inputStyle.root}
        />
        {addBtn}
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
