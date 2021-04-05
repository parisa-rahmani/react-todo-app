import React from 'react';
import Toolbar from '../../components/UI/Toolbar/Toolbar';

const layout = props => {
  return (
    <React.Fragment>
      <header>
        <Toolbar />
      </header>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default layout;
