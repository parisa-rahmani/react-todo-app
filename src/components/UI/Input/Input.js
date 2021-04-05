import React from 'react';

const input = props => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.change}
    />
  );
};

export default React.memo(input);
