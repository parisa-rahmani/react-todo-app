import React from 'react';
import classes from './ListItem.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const listItem = props => {
  let classNames = [];
  if (props.isComplete) {
    classNames = [classes.TodoList__item__completed];
  }

  const btnClass = makeStyles({
    root: {
      minWidth: '1rem',
    },
  })();

  return (
    <li className={classes.TodoList__item}>
      <p className={classNames.join(' ')}>{props.title}</p>
      <Button
        className={btnClass.root}
        name="delete"
        onClick={() => props.removeListItem(props.id)}
      >
        <DeleteIcon />
      </Button>
      <Button
        className={btnClass.root}
        name="complete"
        onClick={() => props.completeItem(props.listItemss, props.id)}
      >
        <CheckCircleIcon />
      </Button>
    </li>
  );
};

export default React.memo(listItem);
