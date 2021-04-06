import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './TodoForm/TodoForm';
import ListItems from '../ListItems/ListItems';
import classes from './TodoList.css';
import axios from 'axios';
import { AuthContext } from '../../context/auth-context';

const TodoList = () => {
  const [listItems, setListItems] = useState([]);
  const [addLoading, setAddLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const userId = (authContext.userId = localStorage.getItem('userId'));
  const token = (authContext.token = localStorage.getItem('token'));

  const initData = () => {
    // const queryParams =
    //   '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    // console.log(queryParams);
    // console.log(authContext.token);
    axios
      .get('https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json')
      .then(response => {
        let transformData = [];
        for (let key in response.data) {
          transformData.push({
            ...response.data[key],
            id: key,
          });
        }
        setListItems(transformData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    initData();
  }, []);

  // console.log(listItems);

  const addListItem = listItem => {
    setAddLoading(true);

    if (listItem.title === '') {
      setAddLoading(false);
      alert('enter somthing');
      return;
    }

    axios
      .post(
        'https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json',
        listItem
      )
      .then(response => {
        setAddLoading(false);
        const id = response.data.name;
        setListItems(prevListItems => [
          ...prevListItems,
          { ...listItem, id, userId },
        ]);
      })
      .catch(error => {
        setAddLoading(false);
        alert(error.message);
      });
  };

  const removeListItem = id => {
    axios
      .delete(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`
      )
      .then(res => {
        initData();
      })
      .catch(err => {
        alert(err.message);
      });

    // setListItems(prevListItems =>
    //   prevListItems.filter(item => {
    //     console.log(item);
    //     item.date !== id;
    //   })
    // );
  };

  const completeItem = id => {
    const compItem = listItems.find(item => item.id === id);

    axios
      .patch(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`,
        { isComplete: !compItem.isComplete }
      )
      .then(res => initData())
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.TodoList}>
      <h1>ToDo List</h1>
      <TodoForm loading={addLoading} onAddListItem={addListItem} />
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
