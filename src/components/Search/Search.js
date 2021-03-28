import React, { useEffect, useState } from 'react';
import Input from '../UI/Input';

const search = props => {
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : { enteredFilter };
    props.onLoadItems();
  }, [enteredFilter]);

  const onChangeInput = event => {
    setEnteredFilter(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="serach here"
        value={enteredFilter}
        change={onChangeInput}
      />
    </div>
  );
};

export default search;
