import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/auth-context';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.logout();
  }, []);

  return <Redirect to="/auth" />;
};

export default Logout;
