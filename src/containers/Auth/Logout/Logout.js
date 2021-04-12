import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Logout = props => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return <Redirect to="/auth" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
