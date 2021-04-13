import React, { useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
import Spinner from '../UI/Spinner/Spinner';
import classes from './ListItems.css';

const listItems = props => {
  const {
    listItems,
    onRemoveItem,
    onCompleteItem,
    onInitData,
    token,
    userId,
  } = props;

  useEffect(() => {
    onInitData(token, userId);
  }, [onInitData]);

  let listItemsOutput = <p>lets add some todo item:)</p>;

  if (listItems.length > 0) {
    listItemsOutput = listItems.map(item => (
      <ListItem
        key={item.date}
        id={item.id}
        title={item.title}
        listItemss={listItems}
        removeListItem={onRemoveItem}
        completeItem={onCompleteItem}
        isComplete={item.isComplete}
        completeLoding={props.completeLoader}
      />
    ));
  }

  let spinner = null;

  if (props.loadingItems) {
    spinner = <Spinner />;
    listItemsOutput = null;
  }

  return (
    <ul className={classes.ListItems}>
      {spinner}
      {listItemsOutput}
    </ul>
  );
};

export default React.memo(listItems);
