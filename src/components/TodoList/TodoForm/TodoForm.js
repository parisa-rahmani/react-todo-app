import React, { useState } from 'react';
import classes from './TodoForm.css';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';

const TodoForm = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();
    props.onAddListItem({
      title: enteredTitle,
      date: new Date().getTime(),
      isComplete: false,
    });
    setEnteredTitle('');
  };

  const onChange = event => {
    setEnteredTitle(event.target.value);
  };

  let spinner = null;
  if (props.loading) spinner = <Spinner />;

  return (
    <div className={classes.TodoForm}>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="type here"
          value={enteredTitle}
          change={onChange}
        />
        {spinner}
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
