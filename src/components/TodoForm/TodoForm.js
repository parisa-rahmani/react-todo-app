import React, { useContext, useState } from 'react';
import classes from './TodoForm.css';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';

import { AuthContext } from '../../context/auth-context';

const TodoForm = props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const authContext = useContext(AuthContext);

  const onSubmitForm = e => {
    e.preventDefault();
    props.onAddListItem({
      title: enteredTitle,
      date: new Date().getTime(),
      isComplete: false,
      userId: authContext.userId,
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
        <button type="submit" disabled={enteredTitle === ''}>
          +
        </button>
      </form>
    </div>
  );
};

export default React.memo(TodoForm);
