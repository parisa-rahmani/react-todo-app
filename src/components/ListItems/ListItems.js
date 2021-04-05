import React from 'react';
import ListItem from '../ListItem/ListItem';
import classes from './ListItems.css';

const listItems = ({ listItems, onRemoveItem, onCompleteItem }) => {
  let listItemsOutput = <p>lets add some todo item:)</p>;

  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => (
      <ListItem
        key={item.date}
        id={item.id}
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
