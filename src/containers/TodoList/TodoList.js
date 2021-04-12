import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  initListItems,
  addListItemStart,
  removeListItemStart,
  completeItemStart,
} from '../../store/actions/todoList';

import TodoForm from '../../components/TodoForm/TodoForm';
import ListItems from '../../components/ListItems/ListItems';
import classes from './TodoList.css';

const TodoList = props => {
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    props.onInitListItems();
  }, []);

  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm loading={addLoading} onAddListItem={props.onAddListItem} />
      <ListItems
        listItems={props.LItems}
        onRemoveItem={props.onRemoveListItem}
        onCompleteItem={props.onCompleteListItem}
        className={classes.TodoList__item}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LItems: state.listItems,
    err: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitListItems: () => dispatch(initListItems()),
    onAddListItem: item => dispatch(addListItemStart(item)),
    onRemoveListItem: id => dispatch(removeListItemStart(id)),
    onCompleteListItem: (listItems, id) =>
      dispatch(completeItemStart(listItems, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TodoList));
