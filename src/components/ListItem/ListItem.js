import React from 'react';

import classes from './ListItem.css';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import * as style from '../../Mui/MuiStyles';
import { motion } from 'framer-motion';

const listItem = props => {
  let classNames = [];
  if (props.isComplete) {
    classNames = [classes.TodoList__item__completed];
  }

  return (
    <motion.li
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      exit={{ scale: 0.2, opacity: 0 }}
      className={classes.TodoList__item}
    >
      <p className={classNames.join(' ')}>{props.title}</p>
      <Button
        className={style.itemBtnClass().root}
        name="delete"
        onClick={() => props.removeListItem(props.id)}
      >
        <DeleteIcon />
      </Button>
      <Button
        className={style.itemBtnClass().root}
        name="complete"
        onClick={() => props.completeItem(props.listItemss, props.id)}
      >
        <CheckCircleIcon />
      </Button>
    </motion.li>
  );
};

export default React.memo(listItem);
