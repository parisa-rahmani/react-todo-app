import React, { useState } from 'react';

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
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="type here"
        value={enteredTitle}
        onChange={onChange}
      />
      <button type="submit">add ToDo</button>
    </form>
  );
};

export default TodoForm;
