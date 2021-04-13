import React, { useState } from 'react';
import classes from './TodoForm.css';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';

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
    <button type="submit" disabled={enteredTitle === ''}>
      +
    </button>
  );
  if (props.loading) addBtn = <Spinner />;

  return (
    <div className={classes.TodoForm}>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="type here"
          value={enteredTitle}
          change={onChange}
        />
        {addBtn}
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
