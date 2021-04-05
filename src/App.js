import React from 'react';
import Layout from './containers/Layout/Layout';
import classes from './App.css';
import TodoList from './components/TodoList/TodoList';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/" exact component={TodoList} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
