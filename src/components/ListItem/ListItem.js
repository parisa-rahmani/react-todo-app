import React from 'react';

const listItem = props => {
  return (
    <li className={props.class}>
      <p>{props.title}</p>
      <span onClick={() => props.removeListItem(props.key)}>Del</span>
    </li>
  );
};

export default listItem;
