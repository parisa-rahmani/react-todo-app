import React, { useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
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

  // console.log(listItems);

  let listItemsOutput = <p>lets add some todo item:)</p>;
  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => {
      return (
        <li className={classes.TodoList__item} key={item.date}>
          <p>{item.title}</p>
          <span onClick={() => removeListItem(item.date)}>Del</span>
        </li>
      );
    });
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
