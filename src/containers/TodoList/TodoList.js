import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/todoList';

import TodoForm from '../../components/TodoForm/TodoForm';
import ListItems from '../../components/ListItems/ListItems';
import classes from './TodoList.css';

const TodoList = props => {
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    props.onInitListItems(props.token, props.userId);
  }, []);

  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm
        loading={addLoading}
        userId={props.userId}
        onAddListItem={props.onAddListItem}
      />
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
    LItems: state.todoList.listItems,
    err: state.todoList.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitListItems: (token, userId) =>
      dispatch(actions.initListItems(token, userId)),
    onAddListItem: item => dispatch(actions.addListItemStart(item)),
    onRemoveListItem: id => dispatch(actions.removeListItemStart(id)),
    onCompleteListItem: (listItems, id) =>
      dispatch(actions.completeItemStart(listItems, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(TodoList));
