import React from 'react';
import ListItem from '../ListItem/ListItem';
import classes from './ListItems.css';

const listItems = ({ listItems, onRemoveItem, onCompleteItem }) => {
  // const removeListItem = id => {
  //   setListItems(prevListItems =>
  //     prevListItems.filter(item => item.date !== id)
  //   );
  // };
  // useEffect(() => {
  //   console.log('render items');
  // });

  // const completeItem = id => {
  //   setListItems(prevListItems =>
  //     prevListItems.map(item => {
  //       if (item.date === id) {
  //         return {
  //           ...item,
  //           isComplete: !item.isComplete,
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };

  let listItemsOutput = <p>lets add some todo item:)</p>;

  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => (
      <ListItem
        key={item.date}
        id={item.date}
        title={item.title}
        removeListItem={onRemoveItem}
        completeItem={onCompleteItem}
        isComplete={item.isComplete}
      />
    ));
  }

  return <ul className={classes.ListItems}>{listItemsOutput}</ul>;
};

export default React.memo(listItems);
