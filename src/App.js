import React, { useContext } from 'react';
import classes from './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext } from './context/auth-context';

// components
import Layout from './containers/Layout/Layout';
import TodoList from './components/TodoList/TodoList';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const App = () => {
  const authContext = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      {/* <Route path="/" exact component={TodoList} /> */}
      <Redirect to="/auth" />
    </Switch>
  );

  if (authContext.isAuth) {
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

export default App;
