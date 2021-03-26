import React, { useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
import classes from './TodoList.css';

const TodoList = props => {
  const [listItems, setListItems] = useState([
    { title: 'list1', date: 'now' },
    { title: 'list2', date: 'yesterday' },
  ]);

  const addListItem = listItem => {
    if (listItem.title === '') return alert('enter something');
    setListItems(prevListItems => [...prevListItems, { ...listItem }]);
  };

  const removeListItem = id => {
    setListItems(prevListItems =>
      prevListItems.filter(item => item.date !== id)
    );
  };

  console.log(listItems);

  let listItemsOutput = <p>lets add some todo item:)</p>;

  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => (
      <li
        className={classes.TodoList__item}
        key={item.date}
        onClick={() => removeListItem(item.date)}
      >
        {item.title}
      </li>
    ));
  }
  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm onAddListItems={addListItem} />
      <ul>{listItemsOutput}</ul>
    </div>
  );
};

export default TodoList;
