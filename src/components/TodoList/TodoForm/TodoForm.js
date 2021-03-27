import React, { useState } from 'react';
import classes from './TodoForm.css';

const TodoForm = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();
    props.onAddListItems({ title: enteredTitle, date: new Date().getTime() });
    setEnteredTitle('');
  };

  const onChange = event => {
    setEnteredTitle(event.target.value);
  };

  return (
    <div className={classes.TodoForm}>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="type here"
          value={enteredTitle}
          onChange={onChange}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default TodoForm;
