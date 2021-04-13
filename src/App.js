import React, { useEffect } from 'react';
import classes from './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
// components
import Layout from './containers/Layout/Layout';
import TodoList from './containers/TodoList/TodoList';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = props => {
  const { onAutoSignIn } = props;

  useEffect(() => {
    onAutoSignIn();
  }, [onAutoSignIn]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={TodoList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className={classes.App}>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.checkAuthState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
