import React, { useState } from 'react';
import classes from './TodoForm.css';
import Input from '../../UI/Input/Input';

const TodoForm = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  // const addListItem = listItem => {
  //   if (listItem.title === '') return alert('enter something');
  //   props.setListItems(prevListItems => [...prevListItems, { ...listItem }]);
  // };

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

  return (
    <div className={classes.TodoForm}>
      <form onSubmit={onSubmitForm}>
        <Input
          type="text"
          placeholder="type here"
          value={enteredTitle}
          change={onChange}
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
