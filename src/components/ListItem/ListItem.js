import React from 'react';
import classes from './ListItem.css';

const listItem = props => {
  let classNames = [];
  if (props.isComplete) {
    classNames = [classes.TodoList__item__completed];
  }

  return (
    <li className={classes.TodoList__item}>
      <p className={classNames.join(' ')}>{props.title}</p>
      <button name="delete" onClick={() => props.removeListItem(props.id)}>
        Delete
      </button>
      <button
        name="complete"
        onClick={() => props.completeItem(props.listItemss, props.id)}
      >
        Complete
      </button>
    </li>
  );
};

export default React.memo(listItem);
