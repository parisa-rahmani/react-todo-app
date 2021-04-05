import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
// import ListItem from '../ListItem/ListItem';
import ListItems from '../ListItems/ListItems';
import classes from './TodoList.css';
import axios from 'axios';

const TodoList = () => {
  const [listItems, setListItems] = useState([]);

  const initData = () => {
    axios
      .get('https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json')
      .then(response => {
        console.log(response.data);
        let transformData = [];
        for (let key in response.data) {
          transformData.push({ ...response.data[key], id: key });
        }
        // const transformData = [
        //   {
        //     title: response.data.title,
        //     date: response.data.date,
        //     isComplete: response.data.isComplete,
        //   },
        // ];
        setListItems(transformData);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    initData();
  }, [setListItems]);

  console.log(listItems);

  const addListItem = listItem => {
    if (listItem.title === '') return alert('enter something');
    axios
      .post(
        'https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json',
        listItem
      )
      .then(response => {
        const id = response.data.name;
        setListItems(prevListItems => [...prevListItems, { ...listItem, id }]);
      })
      .catch(error => console.log(error));
  };

  const removeListItem = id => {
    // console.log(item);
    axios
      .delete(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`
      )
      .then(res => {
        initData();
      })
      .catch(err => console.log(err));

    // setListItems(prevListItems =>
    //   prevListItems.filter(item => item.date !== id)
    // );
  };

  const completeItem = id => {
    const compItem = listItems.find(item => item.id === id);
    console.log(compItem);

    // const upData =
    //   item.date === id ? { ...item, isComplete: !item.isComplete } : ' ';
    // if (item.id === id) {
    axios
      .patch(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`,
        { isComplete: !compItem.isComplete }
      )
      .then(res => initData())
      .catch(err => console.log(err));
    // });
    // if (item.date === id) {
    //   return {
    //     ...item,
    //     isComplete: !item.isComplete,
    //   };
    // }
    // return item;
    //   setListItems(prevListItems => {

    // });
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
    </div>
  );
};

export default React.memo(TodoList);
