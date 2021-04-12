import React from 'react';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import { connect } from 'react-redux';

const layout = props => {
  return (
    <React.Fragment>
      <header>
        <Toolbar isAuth={props.isAuthenticated} />
      </header>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
