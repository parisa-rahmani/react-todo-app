import React from 'react';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import TodoList from '../../components/TodoList/TodoList';

const layout = () => {
  return (
    <React.Fragment>
      <header>
        <Toolbar />
      </header>
      <main>
        <p>search section</p>
        <TodoList />
      </main>
    </React.Fragment>
  );
};

export default layout;
