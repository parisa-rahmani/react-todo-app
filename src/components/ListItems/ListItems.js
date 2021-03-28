import React from 'react';
import ListItem from '../ListItem/ListItem';

const listItems = props => {
  let listItemsOutput = <p>lets add some todo item:)</p>;
  console.log(props);

  if (props.listLength > 0) {
    listItemsOutput = props.listItems.map(item => (
      <ListItem
        key={item.date}
        class={props.class}
        removeListItem={props.removeListItem}
        title={item.title}
      />
    ));
  }

  return <ul>{listItemsOutput}</ul>;
};

export default listItems;
