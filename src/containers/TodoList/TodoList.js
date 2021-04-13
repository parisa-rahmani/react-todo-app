import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/todoList';

import TodoForm from '../../components/TodoForm/TodoForm';
import ListItems from '../../components/ListItems/ListItems';
import classes from './TodoList.css';

const TodoList = props => {
  // const { onInitListItems } = props;

  // useEffect(() => {
  //   onInitListItems(props.token, props.userId);
  // }, [onInitListItems]);

  // useEffect(() => {
  //   console.log('rerender from TodoList container', LItems);
  // }, [LItems]);

  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm userId={props.userId} onAddListItem={props.onAddListItem} />
      <ListItems
        onInitData={props.onInitListItems}
        token={props.token}
        userId={props.userId}
        loadingItems={props.loading}
        listItems={props.LItems}
        onRemoveItem={props.onRemoveListItem}
        onCompleteItem={props.onCompleteListItem}
        completeLoader={props.compBtnloader}
        className={classes.TodoList__item}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    LItems: state.todoList.listItems,
    err: state.todoList.error,
    loading: state.todoList.loading,
    compBtnloader: state.todoList.compBtnloader,
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
