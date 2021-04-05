import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
// import ListItem from '../ListItem/ListItem';
import ListItems from '../ListItems/ListItems';
import classes from './TodoList.css';
import axios from 'axios';

const TodoList = () => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    axios
      .get('https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json')
      .then(response => {
        const transformData = [
          {
            title: response.data.title,
            date: response.data.date,
            isComplete: response.data.isComplete,
          },
        ];
        setListItems(transformData);
      })
      .catch(error => console.log(error));
  }, []);

  console.log(listItems);

  const addListItem = listItem => {
    if (listItem.title === '') return alert('enter something');
    setListItems(prevListItems => [...prevListItems, { ...listItem }]);
  };

  const removeListItem = id => {
    setListItems(prevListItems =>
      prevListItems.filter(item => item.date !== id)
    );
  };

  const completeItem = id => {
    setListItems(prevListItems =>
      prevListItems.map(item => {
        if (item.date === id) {
          return {
            ...item,
            isComplete: !item.isComplete,
          };
        }
        return item;
      })
    );
  };

  // const changeItemHandler = title => {
  //   setListItems(prevItems => [
  //     ...prevItems,
  //     { title: title, date: new Date().getTime() },
  //   ]);
  // };

  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm onAddListItem={addListItem} />
      <ListItems
        listItems={listItems}
        onRemoveItem={removeListItem}
        onCompleteItem={completeItem}
        className={classes.TodoList__item}
      />
      {/* <p>search section</p> */}
      {/* <ul>{listItemsOutput}</ul> */}
    </div>
  );
};

export default React.memo(TodoList);
