import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setListItems = listItems => {
  let transformData = [];
  for (let key in listItems) {
    transformData.push({
      ...listItems[key],
      id: key,
    });
  }
  return {
    type: actionTypes.SET_LISTITEMS,
    listItems: transformData,
  };
};

export const fetchListItemsFailed = () => {
  return {
    type: actionTypes.FETCH_LISTITEMS_FAILED,
  };
};

export const initListItems = () => {
  return dispatch => {
    axios
      .get('https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json')
      .then(response => {
        dispatch(setListItems(response.data));
      })
      .catch(error => {
        dispatch(fetchListItemsFailed());
      });
  };
};

//adding
export const addListItemSucces = (item, id) => {
  return {
    type: actionTypes.ADD_LISTITEM_SUCCESS,
    listItem: item,
    listID: id,
  };
};

export const addListItemFail = () => {
  return {
    type: actionTypes.ADD_LISTITEM_FAIL,
  };
};

export const addListItemStart = listData => {
  return dispatch => {
    axios
      .post(
        'https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems.json',
        listData
      )
      .then(response => {
        dispatch(addListItemSucces(listData, response.data.name));
      })
      .catch(error => {
        dispatch(addListItemFail());
      });
  };
};

// removing
export const removeListItemSuccess = id => {
  return {
    type: actionTypes.REMOVE_LISTITEM_SUCCESS,
    removedID: id,
  };
};

export const removeListItemFail = () => {
  return {
    type: actionTypes.REMOVE_LISTITEM_FAIL,
  };
};

export const removeListItemStart = id => {
  return dispatch => {
    axios
      .delete(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`
      )
      .then(res => {
        dispatch(removeListItemSuccess(id));
      })
      .catch(err => {
        dispatch(removeListItemFail());
      });
  };
};

// completing
export const completeItemSuccess = id => {
  return {
    type: actionTypes.COMPLETE_LISTITEM_SUCCESS,
    completedItemID: id,
  };
};

export const completeItemFail = () => {
  return {
    type: actionTypes.COMPLETE_LISTITEM_FAIL,
  };
};

export const completeItemStart = (listItems, id) => {
  return dispatch => {
    const compItem = listItems.find(item => item.id === id);
    axios
      .patch(
        `https://todo-app-d1d29-default-rtdb.firebaseio.com/todoitems/${id}.json`,
        { isComplete: !compItem.isComplete }
      )
      .then(res => dispatch(completeItemSuccess(id)))
      .catch(err => dispatch(completeItemFail()));
  };
};
