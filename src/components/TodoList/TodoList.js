import React, { useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
import ListItem from '../ListItem/ListItem';
import classes from './TodoList.css';

const TodoList = props => {
  const [listItems, setListItems] = useState([]);

  const addListItem = listItem => {
    if (listItem.title === '') return alert('enter something');
    setListItems(prevListItems => [...prevListItems, { ...listItem }]);
  };

  const removeListItem = id => {
    setListItems(prevListItems =>
      prevListItems.filter(item => item.date !== id)
    );
  };

  // const changeItemHandler = title => {
  //   setListItems(prevItems => [
  //     ...prevItems,
  //     { title: title, date: new Date().getTime() },
  //   ]);
  // };

  let listItemsOutput = <p>lets add some todo item:)</p>;
  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => (
      <ListItem
        key={item.date}
        class={classes.TodoList__item}
        removeListItem={removeListItem}
        title={item.title}
      />
    ));
  }
  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm onAddListItems={addListItem} />
      <p>search section</p>
      <ul>{listItemsOutput}</ul>
    </div>
  );
};

export default TodoList;
