import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/todoList';

import TodoForm from '../../components/TodoForm/TodoForm';
import ListItems from '../../components/ListItems/ListItems';
import classes from './TodoList.css';

import { motion } from 'framer-motion';

const TodoList = props => {
  // useEffect(() => {
  //   console.log('rerender from TodoList container', LItems);
  // }, [LItems]);

  return (
    <div className={classes.TodoList}>
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ToDo List
      </motion.h1>
      <TodoForm
        userId={props.userId}
        loading={props.addLoader}
        onAddListItem={props.onAddListItem}
      />
      <ListItems
        onInitData={props.onInitListItems}
        errorMessage={props.err}
        token={props.token}
        userId={props.userId}
        loadingItems={props.loading}
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
    loading: state.todoList.loading,
    addLoader: state.todoList.addLoader,
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
